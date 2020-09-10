import isFunction from "@yelloxing/core.js/isFunction";

export function valueMixin(LookView) {

  let w, h, min, max;

  LookView.prototype.$$initValue = function (width, height) {

    w = width * 0.01;
    h = height * 0.01;
    min = w > h ? h : w;
    max = w > h ? w : h;

    return this;
  };

  // 针对特殊内心提供前置（交付给具体的绘图方法前）的数据计算方法

  LookView.prototype.$$calcValue = function (oralValue) {

    let doFun = {

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
          return (0 - -value.replace('deg', '')) / 180 * Math.PI;
        } else {
          return 0 - -value;
        }

      },

      // 字符串类型
      "string": function (value) {
        return (value + " ").trim();
      },

      // 默认类型
      "default": function (value) {
        value = (value + " ").trim();

        // 数字类型
        if (/^\d+$/.test(value)) {
          return 0 - -value;
        }

        // 布尔类型
        else if (value == 'true') {
          return true;
        }
        else if (value == 'false') {
          return false;
        }

        // 字符串类型
        else {
          return value;
        }

      }

    }[oralValue.type];

    if (isFunction(doFun)) {
      return doFun(oralValue.value);
    } else {
      return oralValue.value;
    }

  };

};