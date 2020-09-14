import isFunction from '@yelloxing/core.js/isFunction';

// 圆弧

export default function (painter, attr) {

  // 配置画笔
  painter.config({
    "fillStyle": attr['fill-color'] || attr.color || '#000',
    "strokeStyle": attr['stroke-color'] || attr.color || '#000',
    "lineWidth": attr['line-width'] || 1,
    "lineDash": attr['dash'] || []
  });

  let type = attr.type || 'full';

  if (isFunction(painter[type + "Arc"])) {

    // 绘制
    painter[type + "Arc"](attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
  } else {

    // 错误提示
    console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "arc", type }));
  }

};