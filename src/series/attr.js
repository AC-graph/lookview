export default {

  // 颜色值
  color: {

    // 默认为黑色的颜色值
    black: {
      // 字段类型
      type: "string",
      // 是否必输，缺省值就是false
      required: false,
      // 对于非必输的，都应该设置缺省值
      default: "#000"
    }

  },

  // 数字
  num: {

    // 必输
    required: {
      type: "number",
      required: true
    },

    one: {
      type: "number",
      required: false,
      default: 1
    }

  },

  // 数组
  array: {

    // 空数组
    null: {
      type: "json",
      required: false,
      default: []
    }

  },

  // JSON
  json: {

    // 空数组
    null: {
      type: "json",
      required: false,
      default: {}
    }

  }

};