import isFunction from '@yelloxing/core.js/isFunction';
import $$ from '../../image2D';
// 圆弧

export default ["color.black", "num.required", "num.one", "array.null", "json.required", function ($colorBlack, $numRequired, $numOne, $arrayNull, $jsonRequired) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: $arrayNull,
            type: { type: "string", default: "fill" },
            data: $jsonRequired,
            cx: $numRequired,
            cy: $numRequired,
            radius: $numRequired,//用户给定的大圆的半径作为刻度      
        },
        link(painter, attr) {

            // 配置画笔
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash
            });
            // 获取二维数组的每一列和的最大值
            function maxvalue(data) {
                let max = 0;

                for (let i = 0; i < data[0].length; i++) {
                    let sum = [];
                    sum[i] = 0;
                    for (let j = 0; j < data.length; j++) {
                        sum[i] += data[j][i];
                        max = max < sum[i] ? sum[i] : max;
                    }
                }
                return max;
            }
           
            //开始画弧
            let arr = [];
            // 获取一组颜色
            let colors = $$.getRandomColors(attr.data.length);
            //两次for循环获取二维数组中的数
            for (let i = 0; i < attr.data.length; i++) {
                let start, deg = 0;
                for (let j = 0; j < attr.data[i].length; j++) {
                    if (i == 0) {
                        arr[j] = 0;
                    }
                    //起始弧度
                    start = ((Math.PI * 2) / attr.data[i].length) * j;
                    // 跨越弧度
                    deg = ((3 / 2) / attr.data[i].length) * Math.PI;
                    painter.config({
                        fillStyle: colors[i]
                    })
                        .fillArc(attr.cx, attr.cy, arr[j] * (attr.radius / maxvalue(attr.data)), (arr[j] + attr.data[i][j]) * (attr.radius / maxvalue(attr.data)), start, deg);
                    arr[j] += attr.data[i][j];
                }

            }
        }
    };
}];