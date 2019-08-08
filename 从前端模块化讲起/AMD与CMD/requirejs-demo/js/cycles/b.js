define(['a'], function(a) {
  return function() {
    return '我是b.js' + '输出a.js为：' + a
  }
})
// 以下为解决循环依赖的方式，即延迟require
// define(['require'], function(require) {
//   return function() {
//     return '我是b.js' + '输出a.js为：' + require('a')
//   }
// })
