import isFunction from '@yelloxing/core.js/isFunction';
import isValidKey from '../../tool/isValidKey';

// 监听数据改变

export default function (that) {

  for (let key in that.__data) {

    // 由于key的特殊性，注册前需要进行校验
    isValidKey(key);

    if (isFunction(that[key])) {
      console.error('[LookView warn]: Data property "' + key + '" has already been defined as a Method.');
    }

    let value = that.__data[key];

    that[key] = value;

    // 针对data进行拦截，后续对data的数据添加不会自动监听了
    // this._data的数据是初始化以后的，后续保持不变，方便组件被重新使用（可能的设计，当前预留一些余地）
    // 当前对象数据会和方法一样直接挂载在根节点
    Object.defineProperty(that, key, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;

        that.$$lifecycle('beforeUpdate');

        // 数据改变，触发更新
        if (that._isMounted && !this._isDestroyed) that.$updateByData();

        that.$$lifecycle('updated');

      }
    });
  }

};