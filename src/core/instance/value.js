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
        let strValue = (value + " ").trim();

        // 常规的辅助计算
        if (/^\-{0,1}\d+w$/.test(strValue)) {
          return (0 - -strValue.replace('w', '')) * w;
        } else if (/^\-{0,1}\d+h$/.test(strValue)) {
          return (0 - -strValue.replace('h', '')) * h;
        } else if (/^\-{0,1}\d+min$/.test(strValue)) {
          return (0 - -strValue.replace('min', '')) * min;
        } else if (/^\-{0,1}\d+max$/.test(strValue)) {
          return (0 - -strValue.replace('max', '')) * max;
        } else if (/^\-{0,1}\d+pi$/.test(strValue)) {
          return (0 - -strValue.replace('pi', '')) * Math.PI;
        } else if (/^\-{0,1}\d+deg$/.test(strValue)) {
          return (0 - -strValue.replace('deg', '')) / 180 * Math.PI;
        }

        // 文字
        else if (/^\-{0,1}\d+em$/.test(strValue)) {
          return (0 - -strValue.replace('em', '')) * fontSize;
        }

        // 特殊的计算calc
        else if (/^calc\(/.test(strValue)) {

          let valueExp = strValue.replace(/^calc\(/, '').replace(/\)$/, '').replace(/ +/g, ' ').split(' ');

          for (let i = 0; i < valueExp.length; i += 2) {
            valueExp[i] = doFuns.number(valueExp[i]);
          }

          return evalExp(valueExp.join(' '));

        }

        // 进行类型强转
        else if (/^\-{0,1}\d+$/.test(strValue)) {
          return 0 - -strValue;
        }

        else {
          return value;
        }

      },

      // 字符串类型
      "string": function (value) {
        return value;
      },

      // json类型
      "json": function (value) {
        if (isString(value)) {
          try {
            return JSON.parse(value);
          } catch (e) {
            throw new Error('[LookView error]: Is not a valid JSON string!');
          }
        } else {
          return value;
        }
      },

      // 布尔类型
      "boolean": function (value) {
        if (value == 'true') {
          return true;
        }
        else {
          return false;
        }
      },

      // 默认类型
      "default": function (value) {
        value = (value + " ").trim();

        // 由于都内置了类型，这里就不需要再进行默认值猜测了
        return value;

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