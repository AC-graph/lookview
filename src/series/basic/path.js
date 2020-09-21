// 路径

export default ["color.black", "num.one", "json.required", "array.null", function ($colorBlack, $numOne, $jsonRequired, $arrayNull) {
    return {
        attrs: {
            'fill-color': $colorBlack,
            'stroke-color': $colorBlack,
            'line-width': $numOne,
            dash: $arrayNull,
            type: { type: "string", default: "open" },
            array: $jsonRequired,
        },
        link(painter, attr) {
            painter.config({
                "fillStyle": attr['fill-color'],
                "strokeStyle": attr['stroke-color'],
                "lineWidth": attr['line-width'],
                "lineDash": attr.dash,
            });

            let type = attr.type;

            if (type == 'open') {
                painter.beginPath().moveTo(attr.array[0][0], attr.array[0][1])
                for (let i = 1; i < attr.array.length; i++) {
                    painter.lineTo(attr.array[i][0], attr.array[i][1])
                } painter.stroke();
            } else if (type == 'close') {
                painter.beginPath().moveTo(attr.array[0][0], attr.array[0][1])
                for (let i = 1; i < attr.array.length; i++) {
                    painter.lineTo(attr.array[i][0], attr.array[i][1])
                } painter.closePath().stroke().fill();
            } else {
                // 错误提示
                console.error('[LookView error]: Type error!' + JSON.stringify({ series: "path", type }));
            }
        }
    };
}];