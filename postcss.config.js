// 此文件专门处理 postcss 插件
module.exports = {
  // 所有的postcss插件
  plugins: {
    //   自动给css样式加前缀的属性 display：flex
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值 font-size：30px => 300/rootvalue = rem
      propList: ['*'] // 所有的文件都转化rem
    }
  }
}
