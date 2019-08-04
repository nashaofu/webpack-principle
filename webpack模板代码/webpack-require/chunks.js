// 一个文件包含多个chunk
;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['./chunks-1.js', './chunks-2.js'],
  {
    './chunks-1.js': function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_exports__['default'] = () => {
        console.log('I am chunks-1')
      }
    },
    './chunks-2.js': function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_exports__['default'] = () => {
        console.log('I am chunks-2')
      }
    }
  }
])
