import isFunction from '@yelloxing/core.js/isFunction';
import isValidKey from '../../tool/isValidKey';
import isString from '@yelloxing/core.js/isString';

export function initMixin(LookView) {

  LookView.prototype.$$init = function (options) {

    this.__options = options;

    // 需要双向绑定的数据
    this.__data = isFunction(options.data) ? options.data() : options.data;

    // 挂载点
    this.__el = isString(options.el) ? document.querySelector(options.el) : options.el;

    // 记录状态
    this._isMounted = false; this._isDestroyed = false;

    // 挂载方法
    for (let key in options.methods) {

      // 由于key的特殊性，注册前需要进行校验
      isValidKey(key);

      this[key] = options.methods[key];
    }

    // 挂载数据
    for (let key in this.__data) {
      // 数据的校验在监听的时候进行
      this[key] = this.__data[key];
    }

  };

};