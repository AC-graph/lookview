export interface option {

  /**
   * 挂载点
   */
  el: Element,

  /**
   * 数据
   */
  data: Function,

  /**
   * 内置方法
   */
  methods: any,

  /**
   * 解除创建开始前执行
   */
  beforeCreate: Function,

  /**
   * 对象创建完成后执行
   */
  created: Function,

  /**
   * 挂载开始前执行
   */
  beforeMount: Function,

  /**
   * 挂载完成后执行
   */
  mounted: Function,

  /**
   * 解除挂载开始前执行
   */
  beforeUnmount: Function,

  /**
   * 解除挂载完成后执行
   */
  unmounted: Function,

  /**
   * 对象销毁前执行
   */
  beforeDestroy: Function,

  /**
  * 对象销毁后执行
  */
  destroyed: Function,

  /**
  * 数据改变导致的刷新开始前执行
  */
  beforeUpdate: Function,

  /**
  * 数据改变导致的刷新结束后执行
  */
  updated: Function,

  /**
  * 屏幕大小改变导致的刷新开始前执行
  */
  beforeResize: Function,

  /**
   * 屏幕大小改变导致的刷新结束后执行
   */
  resized: Function

}