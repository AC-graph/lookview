
// 基本图形

import arc from './basic/arc';
import circle from './basic/circle';
import rect from './basic/rect';
import text from './basic/text';

// 组合图形

import ruler from './combine/ruler';

export function seriesMixin(LookView) {

  LookView.prototype.__series = {

    arc, circle, rect, text,

    ruler

  };

};