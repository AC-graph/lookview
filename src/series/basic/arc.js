
// 圆弧

export default function (painter, attr) {

  // 配置画笔
  painter.config({
    "fillStyle": attr['fill-color'] || attr.color || '#00',
    "strokeStyle": attr['stroke-color'] || attr.color || '#00',
    "lineWidth": attr['width'] || 1,
    "lineDash": attr['dash'] || []
  });

  // 绘制
  switch (attr.type) {
    case "stroke": {
      painter.strokeArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
      break;
    }
    case "fill": {
      painter.fillArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
      break;
    }
    default: {
      painter.fullArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
    }
  }

};