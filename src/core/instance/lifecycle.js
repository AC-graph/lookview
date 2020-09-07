import isFunction from '@yelloxing/core.js/isFunction';

export function lifecycleMixin(LookView) {

  // 生命周期调用钩子
  // 整个过程，进行到对应时期，都需要调用一下这里对应的钩子
  // 整合在一起的目的是方便维护
  LookView.prototype.$$lifecycle = function (callbackName) {

    // beforeCreate，对象创建前
    if (isFunction(callbackName)) {
      callbackName();
      return;
    }

    if ([

      // 对象创建完毕
      'created',

      // 对象和画布关联前、后
      'beforeMount', 'mounted',

      // 对象和画布解关联前、后
      'beforeUnmount', 'unmounted',

      // 数据改动导致的重绘前、后
      'beforeUpdate', 'updated',

      // 画布大小改变导致的重绘前、后
      'beforeResize', 'resized',

      // 销毁组件
      'beforeDestroy', 'destroyed'

    ].indexOf(callbackName) > -1 && isFunction(this.__options[callbackName])) {
      this.__options[callbackName].call(this);
    }

  };

};