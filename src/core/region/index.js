import $$ from '../../image2D';

// 区域对象，用于存储区域信息
// 初衷是解决类似canvas交互问题
// 可以用于任何标签的区域控制
export default function () {

  let regions = {},//区域映射表
    // canvas = document.createElement('canvas'),
    rgb = [0, 0, 0],//区域标识色彩,rgb(0,0,0)表示空白区域
    p = 'r';//色彩增值位置

  let _this = this;

  // 用于计算包含关系的画板
  let painter, image2d = $$('<canvas>');

  let _width = 0, _height = 0;

  return {

    // 擦除
    "erase": function (drawback) {
      painter.config({
        fillStyle: 'rgb(255,255,255)'
      }).fillRect(0, 0, _width, _height);
    },

    // 更新大小
    "updateSize": function (width, height) {

      _width = width;
      _height = height;

      painter = image2d.attr({
        width, height
      }).painter();

    },

    // 绘制（添加）区域范围
    /**
     * region_id：区域唯一标识（一个标签上可以维护多个区域）
     */
    "drawer": function (region_id, drawback) {
      if (regions[region_id] == undefined) regions[region_id] = {
        'r': function () {
          rgb[0] += 1;
          p = 'g';
          return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        },
        'g': function () {
          rgb[1] += 1;
          p = 'b';
          return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        },
        'b': function () {
          rgb[2] += 1;
          p = 'r';
          return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        }
      }[p]();

      painter.config({
        fillStyle: regions[region_id],
        strokeStyle: regions[region_id]
      });

      drawback(painter);

    },

    // 获取此刻鼠标所在区域
    "getRegion": function (event) {
      let pos = _this.position(event);
      pos.x -= _this.css('border-left-width').replace('px', '');
      pos.y -= _this.css('border-top-width').replace('px', '');
      let currentRGBA = image2d[0].getContext("2d").getImageData(pos.x*2 - 0.5, pos.y*2 - 0.5, 1, 1).data;
      for (let i in regions) {
        if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[i]) {
          return [i, pos.x, pos.y];
        }
      }

      // 说明当前不在任何区域
      return undefined;
    },

    // 打印一些调试信息
    // 不要对外公开此接口
    "$$see": function () {
      console.log(painter.toDataURL());
      console.log(regions);
    }
  };

};