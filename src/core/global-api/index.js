import isFunction from '@yelloxing/core.js/isFunction';

// 挂载一些通用的全局方法

export default function (LookView) {

  // 挂载小组件
  LookView.series = function (name, seriesFunction) {

    if (isFunction(LookView.prototype.__series[name])) {
      console.error('[LookView warn]: The series[' + name + '] has been registered!');
    }

    LookView.prototype.__series[name] = seriesFunction;

  };

};