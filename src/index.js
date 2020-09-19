import $$ from './image2D';
import LookView from './core/instance/index';
import initGlobalApi from './core/global-api/index';
import isElement from '@yelloxing/core.js/isElement';
import compileTemplate from './core/vnode/compile-template';
import resize from './core/observe/resize';

/**
 * 
 * >>> 总入口 <<<
 * 
 * -------------------------------
 * 
 * 【特别说明】
 * 
 * 对于this.XXX的属性或方法，有如下规定：
 *  _ 和 __ 开头的表示资源，前者表示外界可以查看作为判断依据的（但不可以修改），后者为完全内部使用
 *  $ 和 $$ 开头的表示函数，前者表示外界可以调用的，后者表示内部使用
 * 
 * 此外，对外暴露的方法的参数，如果是 __ 开头的，表示外部调用的时候应该忽略此参数
 * 
 * -------------------------------
 * 
 */

initGlobalApi(LookView);

// 挂载的意思是LookView对象和页面关联起来
// 这样挂载了，才会真的绘制
LookView.prototype.$mount = function (el, __isFocus) {

    if (this._isDestroyed) {
        console.warn('[LookView warn]: The object has been destroyed!');
        return;
    }

    this.__el = el;

    if (this._isMounted) {
        console.warn('[LookView warn]: The object is already mounted!');
        return;
    }

    if (!__isFocus && !isElement(el)) {
        console.warn('[LookView warn]: Mount node does not exist!');
        return;
    }

    this.$$lifecycle('beforeMount');

    // 如果我们没有在初始化对象的时候传递render（template也算传递了）
    // 那么我们在每次挂载的时候都会使用挂载地的内容进行组合
    if (!this.__renderFlag) {
        this.__render = compileTemplate(el.innerHTML);
    }

    // 初始化添加画布
    el.innerHTML = '';
    this.__canvas = $$('<canvas>非常抱歉，您的浏览器不支持canvas!</canvas>').appendTo(el);

    // // 绘制
    this.$updateView(true);

    // 挂载后以后，启动画布大小监听
    resize(this);

    this._isMounted = true;
    this.$$lifecycle('mounted');

    return this;
};

// 解挂的意思是LookView对象和页面解除关联
// 因此，后续绘制会停止，不过计算不会
// 因此，后续你可以重新挂载
LookView.prototype.$unmount = function () {

    if (this._isDestroyed) {
        console.warn('[LookView warn]: The object has been destroyed!');
        return;
    }

    if (!this._isMounted) {
        console.warn('[LookView warn]: Object not mounted!');
        return;
    }

    this.$$lifecycle('beforeUnmount');

    // 解除对画布大小改变的监听
    this.__resizeObserver.disconnect();

    this._isMounted = false;
    this.$$lifecycle('unmounted');

    return this;
};

// 彻底销毁资源，无法再重新挂载
// 主要是为了释放一些内置资源
LookView.prototype.$destory = function () {

    if (this._isDestroyed) {
        console.warn('[LookView warn]: The object has been destroyed!');
        return;
    }

    // 先解除绑定
    if (this._isMounted) this.$unmount();

    this.$$lifecycle('beforeDestroy');

    // 删除监听对象
    if (this.__resizeObserver) delete this.__resizeObserver;

    this._isDestroyed = true;
    this.$$lifecycle('destroyed');

    return this;
};

// 对外暴露调用接口

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = LookView;
} else {
    window.LookView = LookView;
}  