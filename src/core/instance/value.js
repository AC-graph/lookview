import isFunction from "@yelloxing/core.js/isFunction";
import isString from '@yelloxing/core.js/isString';
import evalExp from '../../tool/evalExp';

export function valueMixin(LookView) {

  let w = 0, h = 0, min = 0, max = 0;

  LookView.prototype.$$initValue = function (width, height) {

    w = width * 0.01;
    h = height * 0.01;
    min = w > h ? h : w;
    max = w > h ? w : h;

    return this;
  };

  // 针对特殊内心提供前置（交付给具体的绘图方法前）的数据计算方法

  LookView.prototype.$$calcValue = function (oralValue, fontSize) {

    let doFuns = {

      // 数字类型
      "number": value => {
        value = (value + " ").trim();

        // 常规的辅助计算
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
        }

        // 文字
        else if (/em$/.test(value)) {
          return (0 - -value.replace('em', '')) * fontSize;
        }

        // 特殊的计算calc
        else if (/^calc\(/.test(value)) {

          let valueExp = value.replace(/^calc\(/, '').replace(/\)$/, '').replace(/ +/g, ' ').split(' ');

          for (let i = 0; i < valueExp.length; i += 2) {
            valueExp[i] = doFuns.number(valueExp[i]);
          }

          return evalExp(valueExp.join(' '));

        }

        // 默认只进行类型强转
        else {
          return 0 - -value;
        }

      },

      // 字符串类型
      "string": function (value) {
        return (value + " ").trim();
      },

      // json类型
      "json": function (value) {
        if (isString(value)) {
          try {
            return JSON.parse(value);
          } catch (e) {
            throw new Error('[LookView warn]: Is not a valid JSON string!');
          }
        } else {
          return value;
        }
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

    };

    let doFun = doFuns[oralValue.type];

    if (isFunction(doFun)) {
      return doFun(oralValue.value);
    } else {
      return oralValue.value;
    }

  };

};