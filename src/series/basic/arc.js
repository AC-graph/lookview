import isFunction from '@yelloxing/core.js/isFunction';

// 圆弧

export default ["color.black", "num.required", function ($colorBlack, $numRequired) {
  return {
    attrs: {
      'fill-color': $colorBlack,
      'stroke-color': $colorBlack,
      'line-width': { type: "number", default: 1 },
      dash: { type: "json", default: [] },
      type: { type: "string", default: "full" },
      cx: $numRequired,
      cy: $numRequired,
      radius1: $numRequired,
      radius2: $numRequired,
      begin: $numRequired,
      deg: $numRequired
    },
    link(painter, attr) {

      // 配置画笔
      painter.config({
        "fillStyle": attr['fill-color'],
        "strokeStyle": attr['stroke-color'],
        "lineWidth": attr['line-width'],
        "lineDash": attr.dash
      });

      let type = attr.type;

      if (isFunction(painter[type + "Arc"])) {

        // 绘制
        painter[type + "Arc"](attr.cx, attr.cy, attr.radius1, attr.radius2, attr.begin, attr.deg);
      } else {

        // 错误提示
        console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "arc", type }));
      }
    }
  };
}];