import $$ from '../../image2D';

//根据一组数据画出多个矩形
//给定坐标原点为zeroX，zeroY

export default ["color.black", "num.required", "num.one", "array.null", "json.required", function ($colorBlack, $numRequired, $numOne, $arrayNull, $jsonRequired) {
  return {
    attrs: {
      "zero-x": $numRequired, //坐标原点
      "zero-y": $numRequired,
      colors: $jsonRequired,
      width: $numRequired,  //客户从标签传入x,y轴的长度
      height: $numRequired,
      data: $jsonRequired
    },
    link(painter, attr) {

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
      //开始画矩形
      let temp = 5;//temp宽度和数组长度有关，每个小矩形相对于temp居中
      let wid = 1;//每个小矩形的宽度
      let tem = 1;//每个小矩形之间的距离是2*tem
      temp = attr.width / attr.data[0].length;
      wid = temp / 3;
      tem = (temp - wid) / 2;
      //开始画矩形
      let arr = [];
      for (let i = 0; i < attr.data.length; i++) {
        for (let j = 0; j < attr.data[i].length; j++) {
          if (i == 0) {
            arr[j] = 0;
          }
          painter
            .config({
              fillStyle: attr.colors[i]
            })
            .fillRect(attr["zero-x"] + tem + temp * j, attr["zero-y"] - (arr[j] + attr.data[i][j]) * (attr.height / maxvalue(attr.data)), wid, attr.data[i][j] * (attr.height / maxvalue(attr.data)));
          arr[j] += attr.data[i][j];

        }
      }

    }

  }

}]
