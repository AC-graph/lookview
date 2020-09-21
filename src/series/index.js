import compiler from './compiler';

import arc from './basic/arc';
import rect from './basic/rect';
import circle from './basic/circle';
import text from './basic/text';
import path from './basic/path';
import quadratic from './basic/quadratic';
import bezier from './basic/bezier';
import lineruler from './combine/line-ruler';
import polarruler from './combine/polar-ruler';
import rects from './basic/rects';
// todo

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    // 基本图形

    arc: compiler(arc),
    rect: compiler(rect),
    circle: compiler(circle),
    text: compiler(text),
    path: compiler(path),
    quadratic: compiler(quadratic),
    bezier: compiler(bezier),
    rects:compiler(rects),
    // 组合图形
    lineruler: compiler(lineruler),
    polarruler: compiler(polarruler),
    // todo

  };
  LookView.prototype.$$getAttrOptionsBySeries = function (seriesName) {
    return this.__series[seriesName].attrs;
  };

};