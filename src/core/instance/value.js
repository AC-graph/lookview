export function valueMixin(LookView) {

  let w, h, min, max;

  LookView.prototype.$$initValue = function (size) {

    w = size.width * 0.01;
    h = size.height * 0.01;
    min = w > h ? h : w;
    max = w > h ? w : h;

  };

  // 针对特殊内心提供前置（交付给具体的绘图方法前）的数据计算方法

  LookView.prototype.$$calc = {

    // 数字类型
    "number": function (value) {
      value = (value + " ").trim();

      if (/w$/.test(value)) {
        return (0 - -value.replace('w', '')) * w;
      } else if (/h$/.test(value)) {
        return (0 - -value.replace('h', '')) * h;
      } else if (/min$/.test(value)) {
        return (0 - -value.replace('min', '')) * min;
      } else if (/max$/.test(value)) {
        return (0 - -value.replace('max', '')) * max;
      } else if (/pi$/.test(value)) {
        return (0 - -value.replace('pi', '')) * Math.PI;
      } else if (/deg$/.test(value)) {
        return (0 - -value.replace('deg', '')) / 360 * Math.PI;
      } else {
        return 0 - -value;
      }

    }

  };

};