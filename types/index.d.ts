import image2D from './image2d/index';
import $$ from './image2d/index';
import { option } from "./option";
import { painter } from './image2d/painter';

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
   * @param serie 执行方法
   */
  public static series(name: string, serie: (painter: painter, attr: {}) => {}): LookView;

}

export interface exportObject {

  LookView: LookView, image2D, $$

}

// 导出
export default exportObject;