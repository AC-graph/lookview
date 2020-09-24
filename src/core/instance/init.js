import isFunction from '@yelloxing/core.js/isFunction';
import isValidKey from '../../tool/isValidKey';
import coordinateMethods from '../../coordinate/server/index';
import coordinateObject from '../../coordinate/instance/index';

export function initMixin(LookView) {

  LookView.prototype.$$init = function (options) {

    this.__options = options;

    // 需要双向绑定的数据
    this.__data = isFunction(options.data) ? options.data() : options.data;

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

    // 坐标系
    this.__coordinate = coordinateObject;

    // 额外添加一些非坐标系服务
    coordinateMethods.$calc = this.$$calcValue;

    for (let key in options.coordinate) {
      let value = options.coordinate[key];
      if (isFunction(value)) {
        this.__coordinate[key] = value();
      } else {

        let coordinateServer = [];
        for (let i = value.length - 2; i >= 0; i--) {
          coordinateServer.unshift(coordinateMethods[value[i]]);
        }

        this.__coordinate[key] = value[value.length - 1].apply(null, coordinateServer);

      }
    }

    return this;
  };

};