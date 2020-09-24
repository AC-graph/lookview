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

        // 识别Path标签下的所有标签，将标节点名字全部转成大写
        if (nodeList[i].nodeName.toUpperCase() == 'PATH') {
          let lines = [];

          // 将Path节点下的子节点进行循环
          for (let j = 0; j < nodeList[i].children.length; j++) {
            let lineattr = {};

            // 把子节点上所设置的属性获取出来
            for (let k = 0; k < nodeList[i].children[j].attributes.length; k++) {

              let key_type = (nodeList[i].children[j].attributes[k].nodeName + "").split('::');
              lineattr[key_type[0]] = {
                value: nodeList[i].children[j].attributes[k].nodeValue,
                ruler: key_type[1] || "default"
              };
            }

            // 将属性放入数组中去
            lines.push({
              series: (nodeList[i].children[j].nodeName + "").toLowerCase(),
              attr: lineattr
            });
          }

          // 子节点的属性放回到Path节点中去
          attrs.$lines = lines;
          resultData.push({
            series: (nodeList[i].nodeName + "").toLowerCase(),
            attr: attrs,
          });
          continue;
        }

        // 识别text标签下的所有文字
        if (nodeList[i].nodeName.toUpperCase() == 'TEXT') {
          
          let flag=false;
          for(let j=0;j<nodeList[i].attributes.length;j++){

            //判断是否存在content属性，正则表达式是为了将content前的指令去除，易于分辨
            if("content"==nodeList[i].attributes[j].nodeName.replace(/^l\-bind\:/,'').split('::')[0]){
              flag=true
            };
          }
          // 如果不存在content属性或者属性值为空时，将标签下的所有内容放入新建的content属性中
          if (!flag) {

            // innerHTML和innerText都能传相同的值这里暂定使用innerText
            attrs.content= {
              value: nodeList[i].innerHTML,
              ruler: "default"
            };
          }
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