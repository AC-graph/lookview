// 三次贝塞尔曲线
export default ["color.black", "num.one", "num.required", "json.null", function ($colorBlack, $numOne, $numRequired, $jsonNull) {
    return {
        attrs: {
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: $jsonNull,
            x0: $numRequired,
            y0: $numRequired,
            cp1x: $numRequired,
            cp1y: $numRequired,
            cp2x: $numRequired,
            cp2y: $numRequired,
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
                .bezierCurveTo(attr.cp1x, attr.cp1y, attr.cp2x, attr.cp2y, attr.x1, attr.y1)
                .stroke()
        }
    }
}]