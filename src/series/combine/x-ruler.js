
// 直角坐标刻度尺-X

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
            let rule, max, cxlength, originX, originY;
            rule = 5;
            max = Math.max(...attr.data);
            cxlength = -attr.width;
            originX = attr['zero-x'];
            originY = attr['zero-y'];

            // 画刻度尺
            if (attr.width > 0) {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX - cxlength + 30, originY).stroke()
                    .beginPath().moveTo(originX - cxlength + 30, originY).lineTo(originX - cxlength + 25.7573, originY - 4.2426).stroke()
                    .beginPath().moveTo(originX - cxlength + 30, originY).lineTo(originX - cxlength + 25.7573, originY + 4.2426).stroke()
            } else {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX - cxlength - 30, originY).stroke()
                    .beginPath().moveTo(originX - cxlength - 30, originY).lineTo(originX - cxlength - 25.7573, originY - 4.2426).stroke()
                    .beginPath().moveTo(originX - cxlength - 30, originY).lineTo(originX - cxlength - 25.7573, originY + 4.2426).stroke()
            }



            // 对rule稍作处理
            if (Math.ceil(max / rule) > 10) {
                for (let j = 0; ; j++) {
                    rule = 5 + 5 * j;
                    if (Math.ceil(max / rule) <= 10) break;
                }
            };

            // 画小刻度+刻度值
            if (attr.zero == 'true') {
                for (let i = 0; i <= Math.ceil(max / rule); i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "lineWidth": attr['line-width'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        .moveTo(originX - i * cxlength / Math.ceil(max / rule), originY)
                        .lineTo(originX - i * cxlength / Math.ceil(max / rule), originY - 6).stroke()
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "fontSize": attr['font-size'],
                        "fontFamily": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                    }).fillText(rule * i, originX - i * cxlength / Math.ceil(max / rule), originY + 25);
                }
            }else{
                for (let i = 1; i <= Math.ceil(max / rule); i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "lineWidth": attr['line-width'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        .moveTo(originX - i * cxlength / Math.ceil(max / rule), originY)
                        .lineTo(originX - i * cxlength / Math.ceil(max / rule), originY - 6).stroke()
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "fontSize": attr['font-size'],
                        "fontFamily": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                    }).fillText(rule * i, originX - i * cxlength / Math.ceil(max / rule), originY + 25);
                }
            }

        }
    };
}]
