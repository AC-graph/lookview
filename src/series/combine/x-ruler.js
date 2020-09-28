
// 直角坐标刻度尺-X

export default ["color.black", "num.one", "num.required", "array.null", "json.required", "bool.true", function ($colorBlack, $numOne, $numRequired, $arrayNull, $jsonRequired, $boolTrue) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'fill-color': $colorBlack,
            'line-width': $numOne,
            'font-size': { type: "number", default: 10 },
            'font-family': { type: "string", default: "sans-serif" },
            'text-align': { type: "string", default: 'center' },
            'text-baseline': { type: "string", default: 'middle' },
            dash: $arrayNull,
            'zero-x': $numRequired,//原点横坐标
            'zero-y': $numRequired,//原点纵坐标
            data: $jsonRequired,//数据
            width: $numRequired,
            zero: $boolTrue,//判断原点是否需要绘制
            drant: $numOne,// 判断象限
            'data-type': { type: "string", default: 'num' }//处理的数据类型
        },
        link(painter, attr) {

            // rule为数据刻度小区间
            // max、min分别为传入数据的最大/小值
            // cxlength为x轴刻度尺在画布中的长度
            // (originX,originY)为绘制起始点
            // flag记录往反方向延伸多少个小区间
            // dflag记录正负
            let rule, max, min, cxlength, originX, originY, flag, dflag, degree;

            if (attr['data-type'] == 'num') {
                // 判断传入的数据是几维数组（目前最多判断到四维，且要对称规则的数组）
                for (let i = 0; i < attr.data.length; i++) {
                    if (attr.data[i] != undefined) {
                        degree = 1;
                        for (let j = 0; j < attr.data[i].length; j++) {
                            if (attr.data[i][j] != undefined) {
                                degree = 2;
                                for (let k = 0; k < attr.data[i][j].length; k++) {
                                    if (attr.data[i][j][k] != undefined) {
                                        degree = 3;
                                        for (let l = 0; l < attr.data[i][j][k].length; l++) {
                                            degree = 4;
                                            break;
                                        }
                                    } else break;
                                };
                            } else break;
                        };
                    } else break;
                };
                console.log(degree);
                // let degree = 0;
                // function getDegree(data) {
                //     debugger
                //     let i;
                //     for (i = 0; i < data.length; i++) {
                //         if (data[i].length != undefined) {
                //             degree += 1;
                //             data = data[i];
                //             getDegree(data)
                //         } else break;
                //     }
                //     return degree;
                // }
                // getDegree(attr.data);
            }

            if (degree == 1) {
                // 传入的一维数组数据全正||全负||有正有负时max的处理(因为处理的数据暂不存在负数，所以暂时不需要判断)
                if (Math.max(...attr.data) > 0 && Math.min(...attr.data) > 0) {
                    max = Math.max(...attr.data)
                } else if (Math.max(...attr.data) > 0 && Math.min(...attr.data) < 0) {
                    max = Math.abs(Math.max(...attr.data)) > Math.abs(Math.min(...attr.data)) ? Math.abs(Math.max(...attr.data)) : Math.abs(Math.min(...attr.data));
                } else if (Math.max(...attr.data) < 0 && Math.min(...attr.data) < 0) {
                    throw new Error('[LookView error]: Data error! Cannot be all nagative numbers!');
                }
                min = Math.min(...attr.data);
            } else if (degree == 2) {
                // 获取二维数组每列的和的最大值
                max = 0;
                for (let i = 0; i < attr.data[0].length; i++) {
                    let sum = [];
                    sum[i] = 0;
                    for (let j = 0; j < attr.data.length; j++) {
                        sum[i] += attr.data[j][i];
                        max = max < sum[i] ? sum[i] : max;
                    }
                }
            }

            cxlength = -attr.width;
            originX = attr['zero-x'];
            originY = attr['zero-y'];

            // 判断小刻度朝向哪个象限
            if (attr.drant == 1 || attr.drant == 2) {
                dflag = 1;
            } else if (attr.drant == 4 || attr.drant == 3) {
                dflag = -1;
            }

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
            }

            // 画正方向刻度尺
            if (attr.width > 0) {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX - cxlength + 30, originY).stroke()
                    // 画小箭头
                    .moveTo(originX - cxlength + 30, originY).lineTo(originX - cxlength + 25.7573, originY - 4.2426).stroke()
                    .moveTo(originX - cxlength + 30, originY).lineTo(originX - cxlength + 25.7573, originY + 4.2426).stroke()
                    .closePath();
            } else {
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath().moveTo(originX, originY).lineTo(originX - cxlength - 30, originY).stroke()
                    // 画小箭头
                    .moveTo(originX - cxlength - 30, originY).lineTo(originX - cxlength - 25.7573, originY - 4.2426).stroke()
                    .moveTo(originX - cxlength - 30, originY).lineTo(originX - cxlength - 25.7573, originY + 4.2426).stroke()
                    .closePath();
            }

            // 画小刻度+刻度值
            if (attr['data-type'] == 'num') {
                for (let i = attr.zero ? 0 : 1; i <= Math.ceil(max / rule); i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "font-size": attr['font-size'],
                        "font-family": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        // 小刻度
                        .moveTo(originX - i * cxlength / Math.ceil(max / rule), originY)
                        .lineTo(originX - i * cxlength / Math.ceil(max / rule), originY - 6 * dflag).stroke()
                        // 刻度值
                        .fillText(rule * i, originX - i * cxlength / Math.ceil(max / rule), originY + 25 * dflag);
                }
            } else if (attr['data-type'] == 'str') {
                for (let i = 1; i <= attr.data.length; i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "font-size": attr['font-size'],
                        "font-family": attr['font-family'],
                        "lineWidth": attr['line-width'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        // 小刻度
                        .moveTo(originX - i * cxlength / attr.data.length, originY)
                        .lineTo(originX - i * cxlength / attr.data.length, originY - 6 * dflag).stroke()
                        // 刻度值
                        .fillText(attr.data[i - 1], originX - (2 * i - 1) * (0.5 * cxlength / attr.data.length), originY + 25 * dflag);
                }
            }

            // 画负方向刻度尺
            if (min < 0) {

                // 判断需要反向延长几个刻度区间
                for (flag = 1; flag > 0; flag++) {
                    if (Math.floor(min) >= -flag * rule) break
                    else continue;
                }

                // 绘制延长刻度尺
                painter.config({
                    "fillStyle": attr['fill-color'],
                    "strokeStyle": attr['stroke-color'],
                    "lineWidth": attr['line-width'],
                    "lineDash": attr.dash,
                }).beginPath()
                    .moveTo(originX, originY).lineTo(originX + flag * cxlength / Math.ceil(max / rule) + 0.05 * cxlength, originY).stroke()

                // 画小刻度+刻度值
                for (let i = 1; i <= flag; i++) {
                    painter.config({
                        "fillStyle": attr['fill-color'],
                        "strokeStyle": attr['stroke-color'],
                        "lineWidth": attr['line-width'],
                        "font-size": attr['font-size'],
                        "font-family": attr['font-family'],
                        "textAlign": attr['text-align'],
                        "textBaseline": attr['text-baseline'],
                        "lineDash": attr.dash,
                    }).beginPath()
                        // 小刻度
                        .moveTo(originX + i * cxlength / Math.ceil(max / rule), originY)
                        .lineTo(originX + i * cxlength / Math.ceil(max / rule), originY - 6 * dflag).stroke()
                        // 刻度值
                        .fillText(-rule * i, originX + i * cxlength / Math.ceil(max / rule), originY + 25 * dflag);
                }
            }
        }
    };
}]
