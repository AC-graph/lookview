import isFunction from '@yelloxing/core.js/isFunction';

// 圆弧

export default ["color.black", "num.required", "num.one", "array.null", "json.required", function ($colorBlack, $numRequired, $numOne, $arrayNull, $jsonRequired) {
  return {
    attrs: {
      'fill-color': $colorBlack,
      type: { type: "string", default: "fill" },
      cx: $numRequired,
      cy: $numRequired,
      radius: $numRequired,
      data: $jsonRequired,
      colors: $jsonRequired,

    },

    link(painter, attr) {

      // 配置画笔
      painter.config({
        "fillStyle": attr['fill-color'],
      });


      //二维数组每一列的和
      let sum = [];
      for (let i = 0; i < attr.data.length; i++) {
        sum[i] = 0;
        for (let j = 0; j < attr.data[i].length; j++) {
          sum[i] += attr.data[i][j];
        }
      }
      //利用for循环画出弧  start为起始弧度，deg为跨越弧度，inradius为各个环之间的距离
      let start = 0, deg = 0, inradius = 15;
      let r = 0;
      for (let i = 0; i < attr.data.length; i++) {

        for (let j = 0; j < attr.data[i].length; j++) {
          deg = (attr.data[i][j] / sum[i]) * Math.PI * 2
          r = (attr.radius - inradius) / attr.data.length;
          //按一组数据长度给出不同颜色
          painter.config({
            fillStyle: attr.colors[j]
          })
          .fillArc(attr.cx, attr.cy, inradius + i * r, (i + 1) * r, start, deg);

          start += deg;
        }
      }


    }
  };
}];