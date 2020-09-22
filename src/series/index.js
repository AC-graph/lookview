import compiler from './compiler';

import arc from './basic/arc';
import rect from './basic/rect';
import circle from './basic/circle';
import text from './basic/text';
import path from './basic/path';
import lineruler from './combine/line-ruler';
import polarruler from './combine/polar-ruler';
// todo

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    // 基本图形

    arc: compiler(arc),
    rect: compiler(rect),
    circle: compiler(circle),
    text: compiler(text),
    path: compiler(path),

    // 组合图形
    lineruler: compiler(lineruler),
    polarruler: compiler(polarruler)

  };
  LookView.prototype.$$getAttrOptionsBySeries = function (seriesName, pSeries) {
    if (pSeries != undefined) {
      return this.__series[pSeries].subAttrs[seriesName];
    } else {
      return this.__series[seriesName].attrs;
    }
  };

};