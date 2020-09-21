// 二次贝塞尔曲线
export default ["color.black", "num.one", "num.required", "array.null", function ($colorBlack, $numOne, $numRequired, $arrayNull) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: $arrayNull,
            x0: $numRequired,
            y0: $numRequired,
            cpx: $numRequired,
            cpy: $numRequired,
            x1: $numRequired,
            y1: $numRequired,
        },
        link(painter, attr) {
            painter.config({
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash
            }).beginPath()
                .moveTo(attr.x0, attr.y0)
                .quadraticCurveTo(attr.cpx, attr.cpy, attr.x1, attr.y1)
                .stroke()
        }
    }
}]
