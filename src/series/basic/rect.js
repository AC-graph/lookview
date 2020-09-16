import isFunction from '@yelloxing/core.js/isFunction';

// 矩形

export default ["color.black", "num.required", function ($colorBlack, $numRequired) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'line-width': { type: "number", default: 1 },
            dash: { type: "json", default: [] },
            type: { type: "string", default: "full" },
            x: $numRequired,
            y: $numRequired,
            width: $numRequired,
            height: $numRequired
        },
        link(painter, attr) {
            // 配置画笔
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],

                //预留配置区域

            });

            let type = attr.type;

            if (isFunction(painter[type + "Rect"])) {
                // 画出图形
                painter[type + "Rect"](attr.x, attr.y, attr.width, attr.height);
            } else {
                console.warn('[LookView warn]: Type error!' + JSON.stringify({ series: "rect", type }))
            }
        }
    }
}];





