
// 直角坐标刻度尺

export default ["color.black", "num.one", "json.null", "json.required", "str.required", function ($colorBlack, $numOne, $jsonNull, $jsonRequired, $strRequired) {
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
            type: $strRequired,
        },
        link(painter, attr) {
            // clength为刻度尺在画布中的长度
            let rule, max, cxlength, cylength, originX, originY;
            rule = 5;
            max = Math.max(...attr.data);
            cxlength = 0;
            cylength = 0;
            originX = attr['base-point'][0];
            originY = attr['base-point'][1];
            // 判断直角坐标轴的朝向
            if (attr.type == 'N') {
                cylength = '300';
            } else if (attr.type == 'S') {
                cylength = '-300';
            } else if (attr.type == 'W') {
                cxlength = '300';
            } else if (attr.type == 'E') {
                cxlength = '-300';
            } else {
                // 错误提示
                console.error('[LookView error]: Type error!');
            }

            // 画刻度尺
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash,
            }).beginPath().moveTo(originX, originY).lineTo(originX - cxlength, originY - cylength).stroke()

            // 对rule稍作处理
            if (Math.ceil(max / rule) > 10) {
                for (let j = 0; ; j++) {
                    rule = 5 + 5 * j;
                    if (Math.ceil(max / rule) <= 10) break;
                }
            };

            // 画小刻度+刻度值
            if (attr.type == 'N' || attr.type == 'S') {
                for (let i = 0; i <= Math.ceil(max / rule); i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "lineWidth": attr['line-width'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        .moveTo(originX, originY - i * cylength / Math.ceil(max / rule))
                        .lineTo(originX - 10, originY - i * cylength / Math.ceil(max / rule)).stroke()
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
                for (let i = 0; i <= Math.ceil(max / rule); i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "lineWidth": attr['line-width'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        .moveTo(originX - i * cxlength / Math.ceil(max / rule), originY)
                        .lineTo(originX - i * cxlength / Math.ceil(max / rule), originY - 10).stroke()
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "fontSize": attr['font-size'],
                        "fontFamily": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                    }).fillText(rule * i, originX - i * cxlength / Math.ceil(max / rule), originY - 25);
                }
            };
        }
    };
}]
