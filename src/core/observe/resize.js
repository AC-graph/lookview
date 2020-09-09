
// 监听画布大小改变

export default function (that) {

  let canRun = true;

  // 一个延迟执行函数
  let throttle = function (callback, time) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      callback.call(that);
      console.log(1);
      canRun = true;
    }, time);
  };

  // 创建监听对象
  if (!that.__resizeObserver) {
    that.__resizeObserver = new ResizeObserver(() => {
      throttle(that.$updateByResize, 1000);
    });
  }

  // 监听
  that.__resizeObserver.observe(that.__el);

};