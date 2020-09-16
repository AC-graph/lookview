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
            type: { type: "string", default: "stroke" },
            content: $strRequired,
            x: $numRequired,
            y: $numRequired,
        },
        link(painter, attr) {
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "fontSize": attr['font-size'],
                "fontFamily": attr['font-family'],
                "lineWidth": attr['line-width'],
            });

            let type = attr.type;

            if (isFunction(painter[type + "Text"])) {
                painter[type + "Text"](attr.content, attr.x, attr.y);
            } else {
                // 错误提示
                console.error('[LookView error]: Type error!' + JSON.stringify({ series: "text", type }));
            }
        }
    };
}];
