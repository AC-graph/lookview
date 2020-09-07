import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import isElement from '@yelloxing/core.js/isElement';

// LookView对象

function LookView(options) {

  if (!(this instanceof LookView)) {
    console.error('[LookView warn]: LookView is a constructor and should be called with the `new` keyword');
  }

  this.$$lifecycle(options.beforeCreate);

  // 创建对象
  this.$$init(options);

  this.$$lifecycle('created');

  // 如果初始化创建的时候没有传递el
  // 表示开始的时候不需要挂载
  // 可以后续主动挂载
  if (isElement(this.__el)) {

    // 挂载
    this.$mount(this.__el, true);

  }

}

initMixin(LookView);
lifecycleMixin(LookView);

export default LookView;