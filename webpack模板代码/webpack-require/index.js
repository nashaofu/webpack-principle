;(function(modules) {
  // 缓存已经被require的模块
  const installedModules = {}
  // 加载模块
  function __webpack_require__(id) {
    if (installedModules[id]) {
      return installedModules[id].exports
    }
    const module = (installedModules[id] = {
      loaded: false,
      exports: {}
    })
    modules[id].call(module.exports, module, module.exports, __webpack_require__)
    // 标记模块已经被加载完成
    module.loaded = true
    return module.exports
  }

  // 缓存已经被加载的chunk
  const installedChunks = {}

  // js chunk文件加载成功后执行的回调
  function webpackJsonpCallback(data) {
    // js文件中存在的chunk名称
    const chunkIds = data[0]
    // chunk中导出的模块
    const moreModules = data[1]

    const resolves = []

    // 让包含在一个js文件中的所有chunk都完成加载
    // 一个js文件可能包含多个打包前的文件
    for (i = 0; i < chunkIds.length; i++) {
      const chunkId = chunkIds[i]
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0])
      }
      installedChunks[chunkId] = 0
    }

    // 拷贝chunk中的模块
    for (let moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId]
      }
    }

    // 让__webpack_require__.e执行返回的promise全部resolve
    while (resolves.length) {
      resolves.shift()()
    }
  }

  // 加载已经存在于window.webpackJsonp中的模块
  const jsonpArray = (window.webpackJsonp = window.webpackJsonp || [])
  jsonpArray.push = webpackJsonpCallback
  for (let i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i])

  // 插入script标签
  __webpack_require__.e = function(chunkId) {
    const promises = []
    let installedChunkData = installedChunks[chunkId]
    // 已经缓存就直接返回
    if (installedChunkData === 0) return Promise.all(promises)
    if (installedChunkData) {
      // 加载中的情况
      promises.push(installedChunkData[2])
    } else {
      // 全新加载
      const promise = new Promise((resolve, reject) => {
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
      })
      installedChunkData[2] = promise
      promises.push(promise)
      const script = document.createElement('script')

      // 根据chunkId转换为url
      const chunksSrc = {
        './chunk.js': './chunk.js',
        './chunks-1.js': './chunks.js',
        './chunks-2.js': './chunks.js'
      }
      script.src = chunksSrc[chunkId]

      // js加载完成事件
      onScriptComplete = function(event) {
        clearTimeout(timeout)
        // 避免IE内存泄漏
        script.onerror = script.onload = null
        // 没有在已经完成的chunk里面就认为加载失败
        const chunk = installedChunks[chunkId]
        if (chunk !== 0) {
          if (chunk) {
            chunk[1](`${chunkId}加载失败`)
          }
          installedChunks[chunkId] = undefined
        }
      }
      script.onerror = script.onload = onScriptComplete
      // 超时设置
      const timeout = setTimeout(() => onScriptComplete(), 120000)
      document.head.appendChild(script)
    }
    return Promise.all(promises)
  }

  // 加载入口文件
  return __webpack_require__('./index.js')
})({
  './index.js': function(module, exports, __webpack_require__) {
    console.log('I am index.js')

    // 加载./chunk.js
    __webpack_require__
      .e('./chunk.js')
      .then(() => __webpack_require__('./chunk.js'))
      .then(data => {
        data.default()
      })

    // 加载./chunks-1.js
    __webpack_require__
      .e('./chunks-1.js')
      .then(() => __webpack_require__('./chunks-1.js'))
      .then(data => {
        data.default()
      })

    // 加载./chunks-2.js
    __webpack_require__
      .e('./chunks-2.js')
      .then(() => __webpack_require__('./chunks-2.js'))
      .then(data => {
        data.default()
      })
  }
})
