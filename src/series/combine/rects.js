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
        "fillStyle": attr["fill-color"],
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

      let arr = [];
      for (let k = 0; k < attr.data.length; k++) {
        arr.push(attr.data[k]);
      }
      
      
      function drawRect() {
      
        for (let i = 0; i < attr.data.length; i++) {
          let hei = 5;
          //每个小矩形的高 
          hei = attr.height / maxNum(attr.data) * attr.data[i] - attr.height / maxNum(attr.data);
          $$.animation((deep) => { painter.fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"], wid, hei * -deep); }, 5000);
          
          //painter.fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"] - hei, wid, hei);
        }
      } 
      drawRect();

      function update() {
        let oldArr = [];
        if (arr != oldArr) {
          for (let i = 0; i < attr.data.length; i++) {
            if (oldArr[i] != attr.data[i]) {
              oldArr[i] = attr.data[i];
              let hei = 5;
              //每个小矩形的高 
              hei = attr.height / maxNum(attr.data) * oldArr[i] - attr.height / maxNum(attr.data);
              painter.fillRect(attr["zero-x"] + temp * (i + 1) + wid * i, attr["zero-y"] - hei, wid, hei);
             
            }
          }
        }

        oldArr = attr.data;

        //debugger
      }
    }


  }

}]
