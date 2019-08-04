# webpack-require

实现`__webpack_require__`方法和`window['webpackJsonp'].push`，主要演示 webpack 如何加载模块，和代码切割时如何实现的

## 文件目录

```bash
.
├── README.md
├── chunk.js # 一个文件一个chunk
├── chunks.js # 多个chunk为一个文件
├── index.html # html页面
└── index.js # 入口文件
```

## index.html

再笨示例中 html 文件中也只加载入口文件就可以正常运行了，但在实际项目中，我们经常把`node_modules`下的文件打包成一个文件，所在本示例中也可以把`chunk.js`和`chunks.js`放到入口文件前面去加载，运行出来的效果也是一样的

把`chunks.js`放到入口文件前

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo</title>
  </head>
  <body>
    <script src="./chunks.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```

`index.js`文件修改

```js
})({
  './index.js': function(module, exports, __webpack_require__) {
    console.log('I am index.js')

    __webpack_require__
      .e('./chunk.js')
      .then(() => __webpack_require__('./chunk.js'))
      .then(data => {
        data.default()
      })

    // 这里可以不用再滴啊用__webpack_require__.e去加载js文件了
    // 可以直接使用__webpack_require__去加载模块
    __webpack_require__('./chunks-1.js').default()

    // 使用__webpack_require__.e也不会再去加载js文件了
    // 因为chunk已经被缓存在installedChunks中了
    __webpack_require__
      .e('./chunks-2.js')
      .then(() => __webpack_require__('./chunks-2.js'))
      .then(data => {
        data.default()
      })
  }
})
```
