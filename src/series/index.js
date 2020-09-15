import compiler from './compiler';

import arc from './basic/arc';

// todo

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    // 基本图形

    arc: compiler(arc)

    // 组合图形

    // todo

  };

  LookView.prototype.__getAttrOptionBySeries = function (seriesName, key) {

    let options = this.__series[seriesName].attrs[key] || {
      required: false,
      type: "default",
      ruler: "default"
    };
    options.required = options.required || false;

    return options;
  }

};