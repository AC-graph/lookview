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
      data2: $jsonRequired,
      data3: $jsonRequired,


    },
    link(painter, attr) {
      painter.config({
        "fillStyle": "blue",
        "strokeStyle": attr['stroke-color'],
        "lineWidth": attr['line-width'],

      })
      let type = attr.type;

      painter.beginPath()
        .moveTo(attr["zero-x"], attr["zero-y"])
        .lineTo(attr["zero-x"] + attr.width, attr["zero-y"])
        .moveTo(attr["zero-x"], attr["zero-y"])
        .lineTo(attr["zero-x"], attr["zero-y"] - attr.height)
        .stroke()

      function maxNum(data) {
        var maxvalue = data[0];
        for (let i = 0; i < data.length; i++) {
          maxvalue = maxvalue < data[i] ? data[i] : maxvalue
        }
        return maxvalue;
      }

      //计算小矩形的最优宽度
      let wid = 1;
      if (attr.data.length) {
        wid = attr.width / (2 * attr.data.length + 1)
      }

      //每个矩形之间的距离
      let temp = 5;
      //计算公式：  temp + (每个矩形的宽+temp)*数组长度=width
      temp = (attr.width - wid * attr.data.length) / (1 + attr.data.length);
      
      //将页面传过来的数据保存到另一个数组
      let arr = [];
      for (let k = 0; k < attr.data.length; k++) {
        arr.push(attr.data[k]);
      }
      
      // 重画矩形
      function update() {

        for (let i = 0; i < attr.data.length; i++) {
          let hei = 5;
          //每个小矩形的高 
          hei = attr.height / maxNum(attr.data) * attr.data[i] - attr.height / maxNum(attr.data);

          painter.fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"] - hei, wid, hei);

        }
      }


      drawRect();

      //写一个数组中数据的和的方法以便判断数据的数据是否改变
      function subarr(data) {
        let subs = 0;
        for (let i = 0; i < data.length; i++) {
          subs += data[i];
        }
        return subs;
      }
      
      // 画出矩形并且有了初始动画效果
      function drawRect() {
        let oldArr = arr;
        //判断旧数组和新获取的数组的值是否改变
        if (subarr(oldArr) == subarr(attr.data)) {
          for (let i = 0; i < attr.data.length; i++) {
            let h1 = 5, h2 = 5, h3 = 5;
            //let hei = 5;
            //每个小矩形的高 
            let maxvalue = attr.data[0] + attr.data2[0] + attr.data3[0];
            
            for(let i = 0; i < attr.data.length; i++){
               maxvalue = maxvalue < attr.data[i] + attr.data2[i] + attr.data3[i] ? attr.data[i] + attr.data2[i] + attr.data3[i] : maxvalue
            }

           
            //三种不同数据小矩形的高度
            h1 = attr.height / maxvalue * attr.data[i] - attr.height / maxvalue;
            h2 = attr.height / maxvalue * attr.data2[i] - attr.height / maxvalue;
            h3 = attr.height / maxvalue * attr.data3[i] - attr.height / maxvalue;


            //动画效果
            $$.animation((deep) => {

              painter.config({
                fillStyle: "#3d3ac74f",
              })
                .fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"], wid, h1 * -deep);

            }, 1000);

            $$.animation((deep) => {

              painter.config({
                fillStyle: "#c7355e59",
              })
                .fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"] - h1, wid, h2 * -deep);

            }, 2000);

            $$.animation((deep) => {

              painter.config({
                fillStyle: "#3ac75259",
              })
                .fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"] - (h1 + h2), wid, h3 * -deep)

            }, 4000);



          }
          //当数据发生改变时不发生以上动画只有单个矩形发生改变（功能未实现）
        } else if (subarr(oldArr) != subarr(attr.data)) {
           update();

        }
        oldArr = attr.data;

      }
    }


  }

}]
