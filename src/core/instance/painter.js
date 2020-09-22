import $$ from '../../image2D';
import get from '@yelloxing/core.js/get';

let getAttrKey = function (key) {
  return key.replace(/^l\-bind:/, '');
};

let getLForObject = function (lFor, that) {

  let temp = lFor.split(' in ');
  let temp0 = temp[0].trim().replace('(', '').replace(')', '').split(',');
  let temp1 = temp[1].trim();

  return {
    data: get(that, temp1),
    keyName: temp0.length > 1 ? temp0[1].trim() : null,
    valueName: temp0[0].trim()
  };

};

export function painterMixin(LookView) {

  // 绘制方法
  LookView.prototype.$$painter = function () {

    // 重新绘制前，清空画布
    this.__painter.clearRect();

    // 后期可以通过此添加一些额外的辅助数据，目前没有考虑好，因此预留
    let nouse = {}, that = this;

    let doit = function (item, notPainter) {

      let fontSize = 16, attr = {};

      // 由于em单位导致font-size比较特殊，我们先计算出来留着使用
      if (item.attr['font-size']) fontSize = that.$$calcValue('font-size', fontSize);
      attr['font-size'] = fontSize;

      for (let key in item.attr) {

        // 针对特殊的实现，深度解析
        // $开头的是特殊属性
        if (/^\$/.test(key)) {
          let temp = [];

          // 将$开头的特殊属性中的属性值解析后放回到attr中去
          for (let i = 0; i < item.attr[key].value.length; i++) {
            let subItem = item.attr[key].value[i];

            // 将子标签的属性进行解析
            let compiler_subItem = doit(subItem, true);
            temp.push({
              attr: compiler_subItem,
              series: subItem.series,
              directive: subItem.directive
            });

          }
          attr[key] = temp;
          continue;
        }

        if (key != 'font-size') {
          attr[key] = that.$$calcValue(item.attr[key], fontSize);
        }

        // 坐标系
        if (item.attr[key].ruler && item.attr[key].ruler != 'default') {

          // 为了加速，我们再去校验映射注册是否正确
          // 因此这里报错有可能是名称错误
          attr[key] = that.__coordinate[item.attr[key].ruler].link.call(that, attr[key],

            // 这里待优化
            JSON.parse(JSON.stringify(item.attr[key])),

            fontSize);
        }

      }

      if (notPainter) return attr;
      that.__series[item.series].link.call(nouse, that.__painter, attr);

    };

    for (let i = 0; i < this.__renderSeries.length; i++) {
      doit(this.__renderSeries[i]);
    }

    return this;
  };

  /**
   * --------------------------
   * 下面是对外暴露的接口
   */

  // 画布大小改变调用的重绘方法
  LookView.prototype.$updateByResize = function (__notPainter, __needAnimation) {

    let oldSize = this._size, newSize = $$(this.__el).size('content');

    if (oldSize) {
      let dw = oldSize.width - newSize.width;
      let dh = oldSize.height - newSize.height;

      // 如果屏幕改变的特别小，忽略这次缩放
      if (dw < 0.0001 && dw > -0.0001 && dh < 0.0001 && dh > -0.0001) {
        return this;
      }
    }

    this.$$lifecycle('beforeResize');

    // 和别的绘图方法相比，我们唯一需要额外处理的是画布大小相关的内容
    this._size = newSize;

    // 设置画布大小
    this.__canvas.attr({
      width: newSize.width,
      height: newSize.height
    }).css({
      width: this._size.width + "px",
      height: this._size.height + "px"
    });

    this.__painter = this.__canvas.painter();

    // 屏幕缩放，启动动画
    if (!__notPainter && __needAnimation && oldSize) {

      $$.animation((deep) => {

        let width = oldSize ? (newSize.width - oldSize.width) * deep + oldSize.width : newSize.width;
        let height = oldSize ? (newSize.height - oldSize.height) * deep + oldSize.height : newSize.height;

        // 部分数据的计算依赖尺寸，因此这里需要重新初始化
        this.$$initValue(width, height);

        if (!__notPainter) this.$$painter();

      }, 1000, () => {

        this.$$lifecycle('resized');

      });
    }

    // 不然是第一次绘制，不需要动画
    else {

      this.$$initValue(newSize.width, newSize.height);
      if (!__notPainter) this.$$painter();
      this.$$lifecycle('resized');

    }

    return this;
  };

  // 数据改变调用的重绘方法
  LookView.prototype.$updateByData = function (__notPainter) {

    let renderSeries = [], that = this;

    (function doit(renderArray, notPush, pSeries) {

      let tempSubAttrs = [];

      for (let i = 0; i < renderArray.length; i++) {

        // 【指令】l-for='(value,key) in dataList'
        // 此指令优先级最高
        if ('l-for' in renderArray[i].attr) {

          let lFor = getLForObject(renderArray[i].attr['l-for'].value, that), tempRenderArray = [];

          for (let key in lFor.data) {

            // 此处待优化
            let temp = JSON.parse(JSON.stringify(renderArray[i]));

            delete temp.attr['l-for'];

            temp.scope = {
              [lFor.valueName]: lFor.data[key]
            };

            if (lFor.keyName != null) temp.scope[lFor.keyName] = key;

            tempRenderArray.push(temp);
          }

          doit(tempRenderArray);
          continue;
        }

        let directive = [];

        // 【指令】l-if="flag"
        if ('l-if' in renderArray[i].attr) {

          let value = get(that, renderArray[i].attr['l-if'].value.replace(/^\!/, ''));
          if (/^\!/.test(renderArray[i].attr['l-if'].value)) value = !value;
          if (!value) {
            continue;
          } else {
            directive.push({
              attr: 'l-if',
              name: "l-if",
              oral: {
                value: renderArray[i].attr['l-if'].value
              },
              value: true
            });
            delete renderArray[i].attr['l-if'];
          }
        }

        let render = {
          series: renderArray[i].series,
          attr: {},
          directive
        };

        let attrOptions = that.$$getAttrOptionsBySeries(renderArray[i].series, pSeries);

        // 传递属性
        for (let key in renderArray[i].attr) {

          let attrKey = getAttrKey(key);

          // 【指令】l-bind:xxx="xxx"
          if (/^l\-bind\:/.test(key)) {

            let value, oralValue = renderArray[i].attr[key].value;

            if (renderArray[i].scope && oralValue in renderArray[i].scope) {
              value = renderArray[i].scope[oralValue];
            } else {
              value = get(that, oralValue);
            }

            render.attr[attrKey] = {
              value
            };

            render.directive.push({
              attr: attrKey,
              name: "l-bind",
              oral: {
                value: oralValue
              },
              value
            });

          }

          // 普通属性
          else {
            if ("value" in renderArray[i].attr[key]) {
              render.attr[key] = {
                value: renderArray[i].attr[key].value
              };
            } else if (!notPush) {
              render.attr[key] = {
                value: doit(renderArray[i].attr[key], true, render.series)
              };
            }

          }

          if (attrKey in attrOptions) {

            // 共有的一些配置
            render.attr[attrKey].ruler = renderArray[i].attr[key].ruler || "default"
            render.attr[attrKey].type = attrOptions[attrKey].type || "default";
            render.attr[attrKey].required = attrOptions[attrKey].required || false;
            render.attr[attrKey].default = attrOptions[attrKey].default;

          } else {

            if (!/^\$/.test(attrKey)) console.warn('[LookView warn]: "' + attrKey + '" is an undefined property');

          }

        }


        let tempAttrOptions = [];
        for (let key in renderArray[i].attr) {
          tempAttrOptions.push(getAttrKey(key));
        }

        // 内置的默认属性
        for (let key in attrOptions) {
          if (tempAttrOptions.indexOf(key) > -1) {
            // todo
          } else {

            // 如果是必输的，应该抛错
            if (attrOptions[key].required) {
              throw new Error('[LookView error]: ' + key + ' is required!');
            }

            // 非必输的，填充默认值
            else {
              render.attr[key] = {
                default: attrOptions[key].default,
                required: false,
                ruler: "default",
                type: attrOptions[key].type,
                value: attrOptions[key].default
              };

            }

          }
        }

        // 说明只是用来包裹的组
        if (renderArray[i].series == 'group') {
          doit(renderArray[i].children);
        }

        // 默认认为是普通的图形
        else {
          // 如果是内置的子标签，返回拼接成完整的
          // 比如path下的line-to的解析
          if (notPush) {
            tempSubAttrs.push(render);
          } else {
            renderSeries.push(render);
          }
        }

      }

      return tempSubAttrs;

    })(this.__render);

    // 数据的改变应该有过渡动画
    // 目前没有支持，后期考虑添加
    this.__renderSeries = renderSeries;

    if (!__notPainter) this.$$painter();
    return this;
  };

  // 初始化调用的绘制方法
  LookView.prototype.$updateView = function () {

    this
      // 初始化一些参数
      .$updateByResize(true)
      .$updateByData(true)

      // 绘制
      .$$painter();

    return this;
  };

};