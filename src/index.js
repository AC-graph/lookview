import image2D from 'image2d';

let LookView = null;


// 对外暴露调用接口

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = { LookView, image2D, $$: image2D };
} else {
    window.LookView = LookView; window.image2D = image2D; window.$$ = image2D;
}  