import $$ from 'image2d';

export function painterMixin(LookView) {

  // 绘制方法
  LookView.prototype.$$painter = function () {

    // todo

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
  };

  // 数据改变调用的重绘方法
  LookView.prototype.$updateByData = function (__notPainter) {

    // todo

    if (!__notPainter) this.$$painter();
  };

  // 初始化调用的绘制方法
  LookView.prototype.$updateView = function () {

    // 初始化一些参数
    this.$updateByResize(true);
    this.$updateByData(true);

    // 绘制
    this.$$painter();

  };

};