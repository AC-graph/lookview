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

  LookView.prototype.__getAttrOptionsBySeries = function (seriesName) {
    return this.__series[seriesName].attrs;
  };

};