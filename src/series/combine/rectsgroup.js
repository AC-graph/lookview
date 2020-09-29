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
            data: $jsonRequired,

        },
        link(painter, attr) {

            //将二维数组中所有数放入一个数组中，以便计算最大值
            let arrall = []
            for (let i = 0; i < attr.data.length; i++) {
                for (let j = 0; j < attr.data[i].length; j++) {
                    arrall.push(attr.data[i][j]);
                }
            }

            //temp宽度和数组长度有关，每个小矩形相对于temp居中
            let temp = 5;
            //每个小矩形的宽度
            let wid = 1;
            //t为一组矩形在temp中占的大位置边上的空白  te为每个矩形之间的距离
            let t = 10, te = 3;
           
            if (attr.data.length >= 4) {
                te = 1;
            }
            temp = attr.width / attr.data[0].length;
             if(attr.data.length<2){
                t=temp/3;
            }
            wid = (temp - 2 * t - (attr.data.length - 1) * te) / attr.data.length
            //开始画矩形
            let arr = [];
            for (let i = 0; i < attr.data.length; i++) {
                for (let j = 0; j < attr.data[i].length; j++) {
                    painter
                        .config({
                            fillStyle: attr.colors[i]
                        })
                        .fillRect(attr["zero-x"] + t + (wid + te) * i + temp * j, attr["zero-y"] - attr.data[i][j] * (attr.height / Math.max(...arrall)), wid, attr.data[i][j] * (attr.height / Math.max(...arrall)));
                }
            }

        }

    }

}]
