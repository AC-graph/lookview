import isFunction from '@yelloxing/core.js/isFunction';
// 文字

export default ["color.black", "num.required", "num.one", function ($colorBlack, $numRequired, $numOne) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'font-size': { type: "number", default: 16 },
            'font-family': { type: "string", default: "sans-serif" },
            'line-width': $numOne,
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            type: { type: "string", default: "stroke" },
            text: { type: "string", default: "222" },
            x: $numRequired,
            y: $numRequired,
            deg: { type: "number", default: "0pi" }
        },
        link(painter, attr) {
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "fontSize": attr['font-size'],
                "fontFamily": attr['font-family'],
                "lineWidth": attr['line-width'],
                "textAlign": attr['text-align'],
                "textBaseline": attr['text-baseline'],
            });

            let type = attr.type;

            if (isFunction(painter[type + "Text"])) {
                painter[type + "Text"](attr.text, attr.x, attr.y, attr.deg);
            } else {
                // 错误提示
                console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "text", type }));
            }
        }
    };
}];
