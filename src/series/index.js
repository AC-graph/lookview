
// 基本图形

import arc from './basic/arc';
import circle from './basic/circle';
import line from './basic/line';
import rect from './basic/rect';
import text from './basic/text';

// 组合图形

import arcs from './combine/arcs';
import circles from './combine/circles';
import polarRuler from './combine/polar-ruler';
import rects from './combine/rects';
import ruler from './combine/ruler';

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    arc, circle, line, rect, text,
    arcs, circles, "polar-ruler": polarRuler, rects, ruler

  };

};