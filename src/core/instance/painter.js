import $$ from 'image2d';
import get from '@yelloxing/core.js/get';

export function painterMixin(LookView) {

  // 绘制方法
  LookView.prototype.$$painter = function () {

    // 重新绘制前，清空画布
    this.__painter.clearRect();

    // 后期可以通过此添加一些额外的辅助数据，目前没有考虑好，因此预留
    let nouse = {};

    this.__renderSeries.forEach(item => {

      let fontSize = 16, attr = {};

      // 由于em单位导致font-size比较特殊，我们先计算出来留着使用
      if (item.attr['font-size']) fontSize = this.$$calcValue('font-size', fontSize);
      attr['font-size'] = fontSize;

      for (let key in item.attr) {
        if (key != 'font-size') {
          attr[key] = this.$$calcValue(item.attr[key], fontSize);
        }
      }

      this.__series[item.series].link.call(nouse, this.__painter, attr);

    });

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

    (function doit(renderArray) {

      for (let i = 0; i < renderArray.length; i++) {

        // 【指令】l-if="flag"
        if ('l-if' in renderArray[i].attr) {
          if (!get(that, renderArray[i].attr['l-if'].value)) {
            continue;
          }
        }

        let render = {
          series: renderArray[i].series,
          attr: {}
        };

        for (let key in renderArray[i].attr) {

          let attrOption = that.__getAttrOptionBySeries(renderArray[i].series, key);

          // 【指令】l-bind:xxx="xxx"
          if (/^l\-bind\:/.test(key)) {
            render.attr[key.replace(/^l\-bind\:/, '')] = {
              value: get(that, renderArray[i].attr[key].value),
              ruler: renderArray[i].attr[key].ruler
            };
          }

          // 普通属性
          else {
            render.attr[key] = {
              value: renderArray[i].attr[key].value,
              ruler: renderArray[i].attr[key].ruler,
            };
          }

          // 共有的属性
          render.attr[key].type = attrOption.type;
          render.attr[key].required = attrOption.required;
          render.attr[key].default = attrOption.default;

        }

//    l-for
        
       //l-on


        // 说明只是用来包裹的组
        if (renderArray[i].series == 'group') {
          doit(renderArray[i].children);
        }

        // 默认认为是普通的图形
        else {
          renderSeries.push(render);
        }

      }

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