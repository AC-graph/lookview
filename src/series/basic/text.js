import isFunction from '@yelloxing/core.js/isFunction';

// 文字

export default function (painter, attr) {

  let fontSize = (0 - -attr['font-size']) || 16;
  let lineHeight = attr['line-height'] || fontSize * 1.5;

  // 行高比较特殊，重新计算
  if (/em$/.test(lineHeight)) {
    lineHeight = (0 - -lineHeight.replace('em', '')) * fontSize;
  }

  // 配置画笔
  painter.config({
    "fillStyle": attr['fill-color'] || attr.color || '#000',
    "strokeStyle": attr['stroke-color'] || attr.color || '#000',
    "lineWidth": attr['line-width'] || 1,
    "lineDash": attr['dash'] || [],
    "font-size": fontSize,
    "textAlign": attr['align'] || "left",
    "textBaseline": attr['baseline'] || "middle",
    "font-family": attr['family'] || "sans-serif"
  });

  let type = attr.type || 'full';

  if (isFunction(painter[type + "Text"])) {

    let values = (attr['value'] + "").replace(/\n/g, '↵').replace(/\r/g, '').replace(/\\n/g, '↵').split('↵');

    // 由于文字可能多行，绘制的时候稍微特殊一点
    for (let i = 0; i < values.length; i++) {

      // 绘制
      painter[type + "Text"](values[i], attr['x'], attr['y'] + ((i + 0.5) * lineHeight), attr['deg'] || 0);

    }

  } else {

    // 错误提示
    console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "text", type }));
  }

};