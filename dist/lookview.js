
/*!
* lookview - 提供更友好的数据可视化解决方案
* https://github.com/AC-graph/lookview
*
* Includes image2D.js
* https://yelloxing.gitee.io/image2d
* 
* author 心叶
*
* version 2.0.0-dev
* 
* build Fri Sep 04 2020
*
* Copyright 心叶
* Released under the MIT license
* 
* Date:Fri Sep 04 2020 16:27:10 GMT+0800 (GMT+08:00)
*/
        
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var LookView = null;

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = LookView;
  } else {
    window.LookView = LookView;
  }

}());