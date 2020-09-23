import isFunction from '@yelloxing/core.js/isFunction';
// 文字

export default ["color.black", "num.required", "num.one", "str.required", function ($colorBlack, $numRequired, $numOne, $strRequired) {
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
            content: $strRequired,
            x: $numRequired,
            y: $numRequired,
            deg: { type: "number", default: "0pi" }
        },
        region: {
            default(painter, attr) {
                painter.config({
                    "font-size": attr['font-size'],
                    "font-family": attr['font-family'],
                    "lineWidth": attr['line-width'],
                    "textAlign": attr['text-align'],
                    "textBaseline": attr['text-baseline'],
                })[attr.type + "Text"](attr.content, attr.x, attr.y, attr.deg);
            }
        },
        link(painter, attr) {

            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "font-size": attr['font-size'],
                "font-family": attr['font-family'],
                "lineWidth": attr['line-width'],
                "textAlign": attr['text-align'],
                "textBaseline": attr['text-baseline'],
            });

            let type = attr.type;

            if (isFunction(painter[type + "Text"])) {
                painter[type + "Text"](attr.content, attr.x, attr.y, attr.deg);
            } else {
                // 错误提示
                console.error('[LookView error]: Type error!' + JSON.stringify({ series: "text", type }));
            }
        }
    };
}];
