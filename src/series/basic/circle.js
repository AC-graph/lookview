import isFunction from '@yelloxing/core.js/isFunction';

// 圆

export default function (painter, attr) {

  // 配置画笔
  painter.config({
    "fillStyle": attr['fill-color'] || attr.color || '#000',
    "strokeStyle": attr['stroke-color'] || attr.color || '#000',
    "lineWidth": attr['line-width'] || 1,
    "lineDash": attr['dash'] || []
  });

  let type = attr.type || 'full';

  if (isFunction(painter[type + "Circle"])) {

    // 绘制
    painter[type + "Circle"](attr['cx'], attr['cy'], attr['radius']);
  } else {

    // 错误提示
    console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "circle", type }));
  }

};