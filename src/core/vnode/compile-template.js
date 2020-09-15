import isText from '@yelloxing/core.js/isText';
import isElement from '@yelloxing/core.js/isElement';

// 浏览器版本的模板解析者

// 这里是基于浏览器的解析能力，因此可能存在浏览器兼容问题
// loader版本的独立于浏览器，因此更加稳定
// 为了兼容各种情况，我们还是提供了动态模板解析能力

/**
 * 
 * 返回的格式如下（loader返回的格式应该和这里保持一致）：
 * 
 * [{
 *  series:"",
 *  attr:{
 *    key1:{
 *       value:"",
 *       ruler:"",// 默认无特殊刻度尺
 *    },
 *    key2:{
 *    },
 *    ...
 * },
 *  children:[]
 * },{}]
 * 
 */

export default function (template) {

  let node = document.createElement('div');
  node.innerHTML = template;

  return (function doit(node) {

    let resultData = [], nodeList = node.childNodes;

    for (let i = 0; i < nodeList.length; i++) {

      // 如果是文本结点
      if (isText(nodeList[i])) {

        // 对于空格，tab等空白文字结点，我们认为可以直接剔除
        if (!/^[\x20\t\n\r]+$/.test(nodeList[i].textContent)) {
          resultData.push(nodeList[i].textContent);
        }

      }

      // 如果是结点
      else if (isElement(nodeList[i])) {

        let attrs = {};
        for (let j = 0; j < nodeList[i].attributes.length; j++) {
          let key_type = (nodeList[i].attributes[j].nodeName + "").split('::');

          attrs[key_type[0]] = {
            value: nodeList[i].attributes[j].nodeValue,
            ruler: key_type[1] || "default"
          };
        }

        resultData.push({
          series: (nodeList[i].nodeName + "").toLowerCase(),
          attr: attrs,
          children: doit(nodeList[i])
        });

      }

    }

    return resultData;

  })(node);

};