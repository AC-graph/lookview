import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import isElement from '@yelloxing/core.js/isElement';
import { seriesMixin } from '../../series/index';
import compileTemplate from '../vnode/compile-template';
import { painterMixin } from './painter';
import { valueMixin } from './value';
import watcher from '../observe/watcher';

// LookView对象

function LookView(options) {

  if (!(this instanceof LookView)) {
    console.error('[LookView warn]: LookView is a constructor and should be called with the `new` keyword');
  }

  this.$$lifecycle(options.beforeCreate);

  // 创建对象
  this.$$init(options);

  this.$$lifecycle('created');

  // 对象创建好了以后，启动监听
  watcher(this);

  // 这里的登记是为了后续重新挂载的时候判断是否需要重置render
  this.__renderFlag = !!options.render || !!options.template;
  if (!!options.render) {
    this.__render = options.render;
  } else if (!!options.template) {
    this.__render = compileTemplate(options.template);
  }

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
seriesMixin(LookView);
painterMixin(LookView);
valueMixin(LookView);

export default LookView;