import image2D from 'image2d';
import LookView from './core/instance/index';
import initGlobalApi from './core/global-api/index';
import isElement from '@yelloxing/core.js/isElement';
import compileTemplate from './core/vnode/compile-template';

initGlobalApi(LookView);

// 挂载的意思是LookView对象和页面中的画布关联起来
// 这样挂载了，才会真的绘制
LookView.prototype.$mount = function (el, __isFocus) {
    if (this._isMounted) {
        console.error('[LookView warn]: The object is already mounted!');
        return;
    }

    if (!__isFocus && !isElement(el)) {

        console.error('[LookView warn]: Mount node does not exist!');
        return;

    }

    this.$$lifecycle('beforeMount');

    // 如果我们没有在初始化对象的时候传递render（template也算传递了）
    // 那么我们在每次挂载的时候都为使用挂载地的内容进行组合
    if (!this.__renderFlag) {
        this.__render = compileTemplate(el.innerHTML);
    }

    // 初始化添加画布
    this.__el.innerHTML = '';
    this.__canvas = $$('<canvas>非常抱歉，您的浏览器不支持canvas!</canvas>').appendTo(this.__el);

    // 绘制
    this.$updateView();

    this._isMounted = true;
    this.$$lifecycle('mounted');
};

// 解挂的意思是LookView对象和页面中的画布解除关联
// 因此，后续绘制会停止，不过计算不会
// 因此，后续你可以重新挂载
LookView.prototype.$unmount = function () {
    if (!this._isMounted) {
        console.error('[LookView warn]: Object not mounted!');
        return;
    }

    this.$$lifecycle('beforeUnmount');

    // todo

    this._isMounted = false;
    this.$$lifecycle('unmounted');
};

// 彻底销毁资源，无法再重新挂载
// 主要是为了释放一些内置资源
LookView.prototype.$destory = function () {
    if (this._isDestroyed) {
        console.error('[LookView warn]: The object has been destroyed!');
        return;
    }

    this.$$lifecycle('beforeDestroy');

    // todo

    this._isDestroyed = true;
    this.$$lifecycle('destroyed');
};

// 对外暴露调用接口

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = { LookView, image2D, $$: image2D };
} else {
    window.LookView = LookView; window.image2D = image2D; window.$$ = image2D;
}  