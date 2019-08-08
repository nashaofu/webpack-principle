define(['b'], function(b) {
  console.log('a.js中输出b.js内容', b)
  // 执行b.js导出内容
  setTimeout(() => {
    console.log('在a.js中执行b.js导出的内容：', `"${b()}"`)
  })
  return {
    'b.js': b
  }
})
