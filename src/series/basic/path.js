// 路径
import isFunction from '@yelloxing/core.js/isFunction';

export default ["color.black", "num.required", "num.one", function ($colorBlack, $numRequired, $numOne) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: { type: "json", default: [] },
            type: { type: "string", default: "open" },
            x0: $numRequired,
            y0: $numRequired,
            x: $numRequired,
            y: $numRequired,
            x1: $numOne,
            y1: $numOne,
        },
        link(painter, attr) {
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash,
            });

            let type = attr.type;

            if (type == 'open') {
                painter.beginPath().moveTo(attr.x0, attr.y0).lineTo(attr.x, attr.y).stroke();
            } else if (type == 'close') {
                painter.beginPath().moveTo(attr.x0, attr.y0).lineTo(attr.x, attr.y).lineTo(attr.x1, attr.y1).closePath().stroke().fill();
            } else {
                // 错误提示
                console.error('[LookView error]: Type error!' + JSON.stringify({ series: "path", type }));
            }
        }
    };
}];