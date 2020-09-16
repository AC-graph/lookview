
// 判断是否是一个合法的方法名或变量名

export default function (key) {

  // 判断是不是_或者$开头的
  // 这两个内部预留了
  if (/^[_$]/.test(key)) {
    console.warn('[LookView warn]: The beginning of _ or $ is not allowed：' + key);
  }

};