import isFunction from '@yelloxing/core.js/isFunction';

// 圆

export default [ "color.black", "num.required",function($colorBlack,$numRequired ) {
   return{
      attrs:{
          'fill-color':$colorBlack,
          'stroke-color':$colorBlack,
          'line-width':{type:"number",default:1},
          dash:{type:"json",default:[]},
          type:{type:"string",default:"full"},
          cx:$numRequired,
          cy:$numRequired,
          radius:$numRequired,

      },
      link(painter, attr){
         painter.config({
            "fillStyle":attr["fill-color"],
            "strokeStylr":attr["stroke-color"],
            "lineWidth":attr["line-width"]
         });
         let type= attr.type;
         if(isFunction(painter[type+"Circle"])){
            painter[type+"Circle"](attr.cx,attr.cy,attr.radius);
         }else{
            console.error('[LookView warn]: Type error!' + JSON.stringify({ series: "circle", type }));
         }
      }

   }
}];