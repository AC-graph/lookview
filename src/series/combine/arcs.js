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
            // data2: $jsonRequired,
            // data3: $jsonRequired,

        },
        link(painter, attr) {

            // 配置画笔
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash
            });

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

            console.log("最大值为" + maxvalue(attr.data));

            painter.beginPath()
                .moveTo(attr.cx, attr.cy)
                .lineTo(attr.cx + attr.radius, attr.cy)
                .stroke()

            painter.config({
                strokeStyle: "pink",
            })
                .strokeCircle(attr.cx, attr.cy, attr.radius);





            //  for(let i=0;i<attr.data[0].length;i++){

            //      for(let j=0;j<attr.data.length;j++){
            //         let start = 0, deg = 0;
            //         let r=0;
            //         r = attr.radius / maxvalue(attr.data) * attr.data[j][i] - attr.radius / maxvalue(attr.data);

            //         start = ((Math.PI * 2) / attr.data[j].length) *i ;
            //         deg = ((3 / 2) / attr.data[j].length) * Math.PI;
                    

            //         painter
            //         .config({
            //             fillStyle: "red"
            //         })
            //         .fillArc(attr.cx, attr.cy, 0, r, start, deg )

            //     }
            //  }



            for (let i = 0; i < attr.data.length; i++) {
                
                if (attr.data[i].length != null) {
                    for (let j = 0; j < attr.data[i].length; j++) {

                        let start = 0, deg = 0;
                        let r1 = 5, r2 = 5, r3 = 5; i


                        r1 = attr.radius / maxvalue(attr.data) * attr.data[0][j] - attr.radius / maxvalue(attr.data);
                        r2 = attr.radius / maxvalue(attr.data) * attr.data[ 1][j] - attr.radius / maxvalue(attr.data);
                        r3 = attr.radius / maxvalue(attr.data) * attr.data[ 2][j] - attr.radius / maxvalue(attr.data);

                        start = ((Math.PI * 2) / attr.data[i].length) * j;
                        deg = ((3 / 2) / attr.data[i].length) * Math.PI;
                        $$.animation((deep) => {

                            painter
                                .config({
                                    fillStyle: "red"
                                })
                                .fillArc(attr.cx, attr.cy, 0, r1, start, deg * deep)

                            painter
                                .config({
                                    fillStyle: "blue"
                                })
                                .fillArc(attr.cx, attr.cy, r1, r1 + r2, start, deg * deep)

                            painter
                                .config({
                                    fillStyle: "green"
                                })
                                .fillArc(attr.cx, attr.cy, r1 + r2, r1 + r2 + r3, start, deg * deep)


                        }, 2000);

                    }
                }



            }







        }
    };
}];