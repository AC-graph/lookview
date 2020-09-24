import isFunction from '@yelloxing/core.js/isFunction';
import $$ from '../../image2D';
//根据一组数据画出多个矩形
//给定坐标原点为zeroX，zeroY

export default ["color.black", "num.required", "num.one", "array.null", "json.required", function ($colorBlack, $numRequired, $numOne, $arrayNull, $jsonRequired) {
  return {
    attrs: {
      "fill-color": $colorBlack,
      "stroke-color": $colorBlack,
      "line-width": $numOne,
      dash: $arrayNull,
      type: { type: "string", default: "fill" },
      "zero-x": $numRequired, //坐标原点
      "zero-y": $numRequired,
      width: $numRequired,  //客户从标签传入x,y轴的长度
      height: $numRequired,
      data: $jsonRequired,
    },
    link(painter, attr) {
      painter.config({
        "fillStyle": "blue",
        "strokeStyle": attr['stroke-color'],
        "lineWidth": attr['line-width'],

      })
     //画出辅助线x轴y轴
      painter.beginPath()
        .moveTo(attr["zero-x"], attr["zero-y"])
        .lineTo(attr["zero-x"] + attr.width, attr["zero-y"])
        .moveTo(attr["zero-x"], attr["zero-y"])
        .lineTo(attr["zero-x"], attr["zero-y"] - attr.height)
        .stroke()
       
        // 获取二维数组每列的和的最大值
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
      //计算小矩形的最优宽度
      let wid = 1;
      if (attr.data[0].length) {
        wid = attr.width / (2 * attr.data[0].length + 1)
      }
      //每个矩形之间的距离
      let temp = 5;
      //计算公式：  temp + (每个矩形的宽+temp)*数组长度=width
      temp = (attr.width - wid * attr.data[0].length) / (1 + attr.data[0].length);

      //开始画矩形
      let arr = [];
      let colors = $$.getRandomColors(attr.data.length);
      for (let i = 0; i < attr.data.length; i++) {
        for (let j = 0; j < attr.data[i].length; j++) {
          if (i == 0) {
            arr[j] = 0;
          }
            painter.config({
              fillStyle: colors[i]
            })
              .fillRect(attr["zero-x"] + temp * (j + 1) + wid * j, attr["zero-y"] - (arr[j] + attr.data[i][j]) * (attr.width / maxvalue(attr.data)), wid, attr.data[i][j] * (attr.width / maxvalue(attr.data)));

            arr[j] += attr.data[i][j];
        }
        console.log(arr);
      }

    }

  }

}]
