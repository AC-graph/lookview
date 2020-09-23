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
    css,
    attr,
    datum,
    data,
    enter,
    exit,
    loop,
    bind,
    unbind,
    position,
    painter,
    painterCanvas2D,
    painterSVG,
    layer

} from 'image2d/src/export.js';

// 额外补充的
import region from './core/region/index';

// 挂载需要的静态方法
image2D.extend({

    animation,
    rotate,
    getRandomColors,

});

// 挂载需要的类方法
image2D.prototype.extend({

    css,
    attr,
    size,
    painter: painterCanvas2D,
    appendTo,
    position,
    region,
    bind,
    unbind

});

export default image2D;