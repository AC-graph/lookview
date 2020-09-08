import $$ from 'image2d';
import get from '@yelloxing/core.js/get';

export function painterMixin(LookView) {

  // 绘制方法
  LookView.prototype.$$painter = function () {

    // 后期可以通过此添加一些额外的辅助数据，目前没有考虑好，因此预留
    let nouse = {
      "info": "预留"
    };

    this.__renderSeries.forEach(item => {

      let attr = {};
      for (let key in item.attr) {
        attr[key] = this.$$calcValue(item.attr[key]);
      }

      this.__series[item.series].call(nouse, this.__painter, attr);

    });

    return this;
  };

  /**
   * --------------------------
   * 下面是对外暴露的接口
   */

  // 画布大小改变调用的重绘方法
  LookView.prototype.$updateByResize = function (__notPainter) {
    this.$$lifecycle('beforeResize');

    // 和别的绘图方法相比，我们唯一需要额外处理的是画布大小相关的内容
    let size = $$(this.__el).size('content');

    // 设置画布大小
    this.__canvas.attr({
      width: size.width,
      height: size.height
    });

    this.__painter = this.__canvas.painter();

    // 部分数据的计算依赖尺寸，因此这里需要重新初始化
    this.$$initValue(size);

    if (!__notPainter) this.$$painter();

    this.$$lifecycle('resized');

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

          // 【指令】l-bind:xxx="xxx"
          if (/^l\-bind\:/.test(key)) {
            render.attr[key.replace(/^l\-bind\:/, '')] = {
              value: get(that, renderArray[i].attr[key].value),
              type: renderArray[i].attr[key].type
            };
          }

          // 普通属性
          else {
            render.attr[key] = {
              value: renderArray[i].attr[key].value,
              type: renderArray[i].attr[key].type
            };
          }
        }

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