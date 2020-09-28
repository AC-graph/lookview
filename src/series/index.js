import compiler from './compiler';

import arc from './basic/arc';
import rect from './basic/rect';
import circle from './basic/circle';
import text from './basic/text';
import path from './basic/path';

import xruler from './combine/x-ruler';
import yruler from './combine/y-ruler';
import polarruler from './combine/polar-ruler';
import rects from './combine/rects';
import arcs from './combine/arcs';
import arcsrad from './combine/arcsrad';

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    // 基本图形

    arc: compiler(arc),
    rect: compiler(rect),
    circle: compiler(circle),
    text: compiler(text),
    path: compiler(path),
    // 组合图形

    "x-ruler": compiler(xruler),
    "y-ruler": compiler(yruler),
    "polar-ruler": compiler(polarruler),
    rects: compiler(rects),
    arcs: compiler(arcs),
    arcsrad:compiler(arcsrad),

  };
  LookView.prototype.$$getAttrOptionsBySeries = function (seriesName, pSeries) {

    if (seriesName.toLowerCase() == 'group') {
      return {};
    }

    // 判断是否是子标签，并根据答案返回结果
    if (pSeries != undefined) {
      return this.__series[pSeries].subAttrs[seriesName];
    } else {
      return this.__series[seriesName].attrs;
    }
  };

};