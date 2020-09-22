
// 直角坐标刻度尺-Y

export default ["color.black", "num.one", "num.required", "array.null", "json.required", "bool.true", function ($colorBlack, $numOne, $numRequired, $arrayNull, $jsonRequired, $boolTrue) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'fill-color': $colorBlack,
            'line-width': $numOne,
            'zero-x': $numRequired,
            'zero-y': $numRequired,
            'font-size': { type: "number", default: 16 },
            'font-family': { type: "string", default: "sans-serif" },
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            dash: $arrayNull,
            data: $jsonRequired,
            width: $numRequired,
            zero: $boolTrue,
        },
        link(painter, attr) {
            // clength为刻度尺在画布中的长度
            let rule, max, cylength, originX, originY;
            rule = 5;
            max = Math.max(...attr.data);
            cylength = attr.width;
            originX = attr['zero-x'];
            originY = attr['zero-y'];

            // 对rule稍作处理
            if (Math.ceil(max / rule) > 10) {
                for (let j = 0; ; j++) {
                    rule = 5 + 5 * j;
                    if (Math.ceil(max / rule) <= 10) break;
                }
            };

            // 画刻度尺
            if (attr.width > 0) {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX, originY - cylength - 30).stroke()
                    .beginPath().moveTo(originX, originY - cylength - 30).lineTo(originX + 4.2426, originY - cylength - 25.7573).stroke()
                    .beginPath().moveTo(originX, originY - cylength - 30).lineTo(originX - 4.2426, originY - cylength - 25.7573).stroke()

                // 画小刻度+刻度值
                if (attr.zero == 'true') {
                    for (let i = 0; i <= Math.ceil(max / rule); i++) {
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "strokeStyle": attr['stroke-color'],
                            "lineWidth": attr['line-width'],
                            "lineDash": attr.dash,
                        }).beginPath()
                            .moveTo(originX, originY - i * cylength / Math.ceil(max / rule))
                            .lineTo(originX - 6, originY - i * cylength / Math.ceil(max / rule)).stroke()
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "fontSize": attr['font-size'],
                            "fontFamily": attr['font-family'],
                            "lineWidth": attr['line-width'],
                            "textAlign": attr['text-align'],
                            "textBaseline": attr['text-baseline'],
                        }).fillText(rule * i, originX - 25, originY - i * cylength / Math.ceil(max / rule));
                    }
                } else {
                    for (let i = 1; i <= Math.ceil(max / rule); i++) {
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "strokeStyle": attr['stroke-color'],
                            "lineWidth": attr['line-width'],
                            "lineDash": attr.dash,
                        }).beginPath()
                            .moveTo(originX, originY - i * cylength / Math.ceil(max / rule))
                            .lineTo(originX - 6, originY - i * cylength / Math.ceil(max / rule)).stroke()
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "fontSize": attr['font-size'],
                            "fontFamily": attr['font-family'],
                            "lineWidth": attr['line-width'],
                            "textAlign": attr['text-align'],
                            "textBaseline": attr['text-baseline'],
                        }).fillText(rule * i, originX - 25, originY - i * cylength / Math.ceil(max / rule));
                    }
                }

            } else {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX, originY - cylength + 30).stroke()
                    .beginPath().moveTo(originX, originY - cylength + 30).lineTo(originX + 4.2426, originY - cylength + 25.7573).stroke()
                    .beginPath().moveTo(originX, originY - cylength + 30).lineTo(originX - 4.2426, originY - cylength + 25.7573).stroke()

                // 画小刻度+刻度值
                if (attr.zero == 'true') {
                    for (let i = 0; i <= Math.ceil(max / rule); i++) {
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "strokeStyle": attr['stroke-color'],
                            "lineWidth": attr['line-width'],
                            "lineDash": attr.dash,
                        }).beginPath()
                            .moveTo(originX, originY - i * cylength / Math.ceil(max / rule))
                            .lineTo(originX + 6, originY - i * cylength / Math.ceil(max / rule)).stroke()
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "fontSize": attr['font-size'],
                            "fontFamily": attr['font-family'],
                            "lineWidth": attr['line-width'],
                            "textAlign": attr['text-align'],
                            "textBaseline": attr['text-baseline'],
                        }).fillText(rule * i, originX + 25, originY - i * cylength / Math.ceil(max / rule));
                    }
                } else {
                    for (let i = 1; i <= Math.ceil(max / rule); i++) {
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "strokeStyle": attr['stroke-color'],
                            "lineWidth": attr['line-width'],
                            "lineDash": attr.dash,
                        }).beginPath()
                            .moveTo(originX, originY - i * cylength / Math.ceil(max / rule))
                            .lineTo(originX + 6, originY - i * cylength / Math.ceil(max / rule)).stroke()
                        painter.config({
                            "fillStyle": attr['fill-color'],
                            "fontSize": attr['font-size'],
                            "fontFamily": attr['font-family'],
                            "lineWidth": attr['line-width'],
                            "textAlign": attr['text-align'],
                            "textBaseline": attr['text-baseline'],
                        }).fillText(rule * i, originX + 25, originY - i * cylength / Math.ceil(max / rule));
                    }
                }

            }

        }
    };
}]
