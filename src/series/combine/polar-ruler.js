import $$ from '../../image2D'

// 极坐标刻度尺
export default ["color.black", "num.one", "num.required", "array.null", "json.required", function ($colorBlack, $numOne, $numRequired, $arrayNull, $jsonRequired) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'fill-color': $colorBlack,
            'line-width': $numOne,
            'font-size': { type: "number", default: 16 },
            'font-family': { type: "string", default: "sans-serif" },
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            cx: $numRequired,//圆心横坐标
            cy: $numRequired,//圆心纵坐标
            dash: $arrayNull,
            data: $jsonRequired,//数据
            radius: $numRequired,//半径
            begin: $numRequired,//起始弧度
            deg: { type: "number", default: '360deg' }//跨越弧度
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
            dd = $$.rotate(originX, originY, deg, originX + radius * Math.cos(begin), originY + radius * Math.sin(begin));

            // 画弧刻度尺
            if (deg > 0) {
                dd1 = $$.rotate(originX, originY, deg, originX + radius * Math.cos(begin) + 6 * Math.cos(2 * Math.PI / 3 - begin), originY + radius * Math.sin(begin) - 6 * Math.sin(2 * Math.PI / 3 - begin));
                dd2 = $$.rotate(originX, originY, deg, originX + radius * Math.cos(begin) + 6 * Math.cos(Math.PI / 3 - begin), originY + radius * Math.sin(begin) - 6 * Math.sin(Math.PI / 3 - begin));
                painter.config({
                    "strokeStyle": attr["stroke-color"],
                    "lineWidth": attr["line-width"]
                }).arc(originX, originY, radius, begin, deg).stroke()
                    // 画箭头
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd1[0], dd1[1]).stroke()
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd2[0], dd2[1]).stroke()
            } else {
                dd3 = $$.rotate(originX, originY, deg, originX + radius * Math.cos(begin) - 6 * Math.cos(2 * Math.PI / 3 - begin), originY + radius * Math.sin(begin) + 6 * Math.sin(2 * Math.PI / 3 - begin));
                dd4 = $$.rotate(originX, originY, deg, originX + radius * Math.cos(begin) - 6 * Math.cos(Math.PI / 3 - begin), originY + radius * Math.sin(begin) + 6 * Math.sin(Math.PI / 3 - begin));
                painter.config({
                    "strokeStyle": attr["stroke-color"],
                    "lineWidth": attr["line-width"]
                }).arc(originX, originY, radius, begin, deg).stroke()
                    // 画箭头
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd3[0], dd3[1]).stroke()
                    .beginPath().moveTo(dd[0], dd[1]).lineTo(dd4[0], dd4[1]).stroke()
            }



            for (let i = 0; i < attr.data.length; i++) {

                // ddd存放刻度值旋转后的坐标
                let ddd = [];
                ddd = $$.rotate(originX, originY, rulerc * i, originX + (radius + 50) * Math.cos(begin), originY + (radius + 50) * Math.sin(begin))
                painter.config({
                    "fillStyle": attr["fill-color"],
                    "lineWidth": attr["line-width"]
                })
                    // 画小刻度
                    .fillArc(originX, originY, radius, radius + 6, begin + (deg * i) / attr.data.length - 0.003, 0.006)
                    // 画原点
                    .fillCircle(originX + radius * Math.cos(begin), originY + radius * Math.sin(begin), 6)

                // 画刻度值
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "fontSize": attr['font-size'],
                    "fontFamily": attr['font-family'],
                    "lineWidth": attr['line-width'],
                    "textAlign": attr['text-align'],
                    "textBaseline": attr['text-baseline'],
                }).fillText(attr.data[i], ddd[0], ddd[1])
            }

        }
    };
}];