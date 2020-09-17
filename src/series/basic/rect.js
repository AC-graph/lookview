import isFunction from '@yelloxing/core.js/isFunction';

// 矩形

export default ["color.black", "num.required", "num.one", "array.null", function ($colorBlack, $numRequired, $numOne, $arrayNull) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: $arrayNull,
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
                console.error('[LookView error]: Type error!' + JSON.stringify({ series: "rect", type }))
            }
        }
    }
}];





