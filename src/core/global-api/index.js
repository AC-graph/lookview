import isFunction from '@yelloxing/core.js/isFunction';
import compiler from '../../series/compiler';

// 挂载一些通用的全局方法

export default function (LookView) {

  // 挂载小组件
  LookView.series = function (name, serie) {

    if (isFunction(LookView.prototype.__series[name])) {
      console.warn('[LookView warn]: The series[' + name + '] has been registered!');
    }

    LookView.prototype.__series[name] = compiler(serie);

    return LookView;

  };

};