import {
    image2D,

    treeLayout,
    pieLayout,
    Matrix4,
    animation,
    cardinal,
    rotate,
    move,
    scale,
    dot,
    formatColor,
    getRandomColors,
    stopPropagation,
    preventDefault,
    map,

    appendTo,
    prependTo,
    afterTo,
    beforeTo,
    remove,
    filter,
    text,
    html,
    size,
    style,
    attribute,
    datum,
    data,
    enter,
    exit,
    loop,
    bind,
    unbind,
    position,
    painter,
    layer

} from 'image2d/src/export.js';

// 挂载需要的静态方法
image2D.extend({

    animation,
    rotate

});

// 挂载需要的类方法
image2D.prototype.extend({

    css: style,
    attr: attribute,
    size,
    painter,
    appendTo

});

export default image2D;