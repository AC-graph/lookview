import $$ from 'image2d'

// 极坐标刻度尺
export default ["color.black", "num.one", "num.required", "json.null", "json.required", function ($colorBlack, $numOne, $numRequired, $jsonNull, $jsonRequired) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'fill-color': $colorBlack,
            'line-width': $numOne,
            'base-point': $jsonRequired,
            'font-size': { type: "number", default: 16 },
            'font-family': { type: "string", default: "sans-serif" },
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            dash: $jsonNull,
            data: $jsonRequired,
            radius: $numRequired,
        },
        link(painter, attr) {
            let rulerc, originX, originY;
            rulerc = Math.PI * 2 / attr.data.length;
            originX = attr['base-point'][0];
            originY = attr['base-point'][1];
            // 画定外圆
            painter.config({
                "strokeStyle": attr["stroke-color"],
                "lineWidth": attr["line-width"]
            }).strokeCircle(originX, originY, attr.radius)

            for (let i = 0; i < attr.data.length; i++) {
                // 画外圆小刻度
                painter.config({
                    "fillStyle": attr["fill-color"],
                    "lineWidth": attr["line-width"]
                }).fillArc(originX, originY, attr.radius, attr.radius + 10, (Math.PI * 2 * i) / attr.data.length - 0.003, 0.006)

                // 外圆刻度值的坐标数组
                let dd = [];
                dd = $$.rotate(originX, originY, rulerc * i, originX + (attr.radius + 50) * Math.cos(rulerc / 2), originY - (attr.radius + 50) * Math.sin(rulerc / 2))
                // 画外圆刻度值
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "fontSize": attr['font-size'],
                    "fontFamily": attr['font-family'],
                    "lineWidth": attr['line-width'],
                    "textAlign": attr['text-align'],
                    "textBaseline": attr['text-baseline'],
                }).fillText(attr.data[i], dd[0], dd[1])
            }

        }
    };
}];