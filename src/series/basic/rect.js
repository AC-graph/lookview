import isFunction from '@yelloxing/core.js/isFunction';

// 矩形

export default function (painter, attr) {

  // 配置画笔
  painter.config({
    "fillStyle": attr['fill-color'] || attr.color || '#000',
    "strokeStyle": attr['stroke-color'] || attr.color || '#000',
    "lineWidth": attr['line-width'] || 1,
    "lineDash": attr['dash'] || []
  });

  let type = attr.type || 'full';

  if (isFunction(painter[type + "Rect"])) {

    // 绘制
    painter[type + "Rect"](attr['x'], attr['y'], attr['width'], attr['height']);
  } else {

    // 错误提示
    console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "rect", type }));
  }

};