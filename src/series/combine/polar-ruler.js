import $$ from '../../image2D'

// 极坐标刻度尺
export default ["color.black", "num.one", "num.required", "array.null", "json.required", function ($colorBlack, $numOne, $numRequired, $arrayNull, $jsonRequired) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'fill-color': $colorBlack,
            'line-width': $numOne,
            'font-size': { type: "number", default: 10 },
            'font-family': { type: "string", default: "sans-serif" },
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            cx: $numRequired,//圆心横坐标
            cy: $numRequired,//圆心纵坐标
            dash: $arrayNull,
            data: $jsonRequired,//数据
            radius: $numRequired,//半径
            begin: $numRequired,//起始弧度
            deg: { type: "number", default: '360deg' },//跨越弧度
            'data-type': { type: "string", default: 'num' }//处理的数据类型
        },
        link(painter, attr) {

            // rulerc刻度区间
            // originX、originY分别为圆心横纵坐标
            // dd存放刻度尺终点坐标
            // dd1存放箭头尾点坐标
            // dd2存放箭头尾点坐标
            // dd3存放箭头尾点坐标
            // dd4存放箭头尾点坐标
            let rulerc, originX, originY, begin, deg, radius, dd = [], dd1 = [], dd2 = [], dd3 = [], dd4 = [];
            originX = attr.cx;
            originY = attr.cy;
            begin = attr.begin;
            deg = attr.deg;
            radius = attr.radius;
            rulerc = deg / attr.data.length;
            dd = $$.rotate(originX, originY, deg + 0.05 * deg, originX + radius * Math.cos(begin), originY + radius * Math.sin(begin));

            // 画弧刻度尺
            if (deg > 0) {
                dd1 = $$.rotate(originX, originY, deg + 0.05 * deg, originX + radius * Math.cos(begin) + 6 * Math.cos(2 * Math.PI / 3 - begin), originY + radius * Math.sin(begin) - 6 * Math.sin(2 * Math.PI / 3 - begin));
                dd2 = $$.rotate(originX, originY, deg + 0.05 * deg, originX + radius * Math.cos(begin) + 6 * Math.cos(Math.PI / 3 - begin), originY + radius * Math.sin(begin) - 6 * Math.sin(Math.PI / 3 - begin));
                painter.config({
                    "strokeStyle": attr["stroke-color"],
                    "lineWidth": attr["line-width"]
                }).arc(originX, originY, radius, begin, deg + 0.05 * deg).stroke()
                    // 画箭头
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd1[0], dd1[1]).stroke()
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd2[0], dd2[1]).stroke()
            } else {
                dd3 = $$.rotate(originX, originY, deg + 0.05 * deg, originX + radius * Math.cos(begin) - 6 * Math.cos(2 * Math.PI / 3 - begin), originY + radius * Math.sin(begin) + 6 * Math.sin(2 * Math.PI / 3 - begin));
                dd4 = $$.rotate(originX, originY, deg + 0.05 * deg, originX + radius * Math.cos(begin) - 6 * Math.cos(Math.PI / 3 - begin), originY + radius * Math.sin(begin) + 6 * Math.sin(Math.PI / 3 - begin));
                painter.config({
                    "strokeStyle": attr["stroke-color"],
                    "lineWidth": attr["line-width"]
                }).arc(originX, originY, radius, begin, deg + 0.05 * deg).stroke()
                    // 画箭头
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd3[0], dd3[1]).stroke()
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd4[0], dd4[1]).stroke()
            }

            // 判断要处理的数据类型
            if (attr['data-type'] == 'num') {
                let rule, max
                max = Math.max(...attr.data);

                // 对rule稍作处理
                if (max > 0 && max < 9) {
                    rule = 0.5;
                    if (Math.ceil(max / rule) > 10 || Math.ceil(max / rule) < 4) {
                        for (let j = 0; ; j++) {
                            rule = 0.5 + 0.5 * j;
                            if (Math.ceil(max / rule) <= 10 && Math.ceil(max / rule) >= 4) break;
                        }
                    };
                } else if (max >= 9) {
                    rule = 2;
                    if (Math.ceil(max / rule) > 10 || Math.ceil(max / rule) < 4) {
                        for (let j = 0; ; j++) {
                            rule = 2 + 2 * j;
                            if (Math.ceil(max / rule) <= 10 && Math.ceil(max / rule) >= 4) break;
                        }
                    };
                } else if (max <= 0) {
                    throw new Error('[LookView error]: Data error! Cannot be all nagative numbers!');
                }

                for (let i = 0; i <= Math.ceil(max / rule); i++) {

                    // ddd存放刻度值旋转后的坐标
                    let ddd = [];
                    ddd = $$.rotate(originX, originY, deg * i / Math.ceil(max / rule), originX + (radius + 30) * Math.cos(begin), originY + (radius + 30) * Math.sin(begin))
                    painter.config({
                        "fillStyle": attr["fill-color"],
                        "lineWidth": attr["line-width"]
                    })
                        // 画小刻度
                        .fillArc(originX, originY, radius, radius + 6, begin + (deg * i) / Math.ceil(max / rule) - 0.003, 0.006)
                        // 画原点
                        .fillCircle(originX + radius * Math.cos(begin), originY + radius * Math.sin(begin), 5.5)

                    // 画刻度值
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "font-size": attr['font-size'],
                        "font-family": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline']
                    }).fillText(i * rule, ddd[0], ddd[1])
                }

            } else if (attr['data-type'] == 'str') {
                for (let i = 0; i < attr.data.length; i++) {

                    // ddd存放刻度值旋转后的坐标
                    let ddd = [];
                    ddd = $$.rotate(originX, originY, rulerc * i, originX + (radius + 30) * Math.cos(begin), originY + (radius + 30) * Math.sin(begin))
                    painter.config({
                        "fillStyle": attr["fill-color"],
                        "lineWidth": attr["line-width"]
                    })
                        // 画小刻度
                        .fillArc(originX, originY, radius, radius + 6, begin + (deg * i) / attr.data.length - 0.003, 0.006)
                        // 画原点
                        .fillCircle(originX + radius * Math.cos(begin), originY + radius * Math.sin(begin), 5.5)

                    // 画刻度值
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "font-size": attr['font-size'],
                        "font-family": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline']
                    }).fillText(attr.data[i], ddd[0], ddd[1])
                }
            }
        }
    };
}];