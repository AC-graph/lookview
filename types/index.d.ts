import { option } from "./option";

declare class LookView {

  // 构造函数
  constructor(option: option);

  /**
   * 挂载对象
   * @param el 挂载点
   */
  $mount(el: Element): this;

  /**
   * 解除挂载
   */
  $unmount(): this;

  /**
   * 销毁对象
   */
  $destory(): this;

  /**
   * 挂载的新图形
   * @param name 图形名称
   * @param serie 格式如：
   * 
   * ["type1","type2",function($type1,$type2){
   * 
   *  return {
   * 
   *    attrs: {
   * 
   *        // 配置选项
   * 
   *    },
   * 
   *    link(painter, attr) {
   * 
   *      // 绘制
   * 
   *    }
   * 
   * };  
   * 
   * }]
   * 
   */
  public static series(name: string, serie:Array): LookView;

}

// 导出
export default LookView;