const path = require('path')
const webpack = require('webpack')

function getConfig(name, file) {
  return {
    mode: 'production',
    entry: {
      [name]: file
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    optimization: {
      minimize: false
    },
    devtool: false
  }
}

// 没有代码切割的情况
webpack(getConfig('app', './src/index.js'), (err, stats) => {
  if (err) return console.log(err)
  // 打印结果
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
})

// 代码切割示例
webpack(getConfig('splitChunk', './src/splitChunk.js'), (err, stats) => {
  if (err) return console.log(err)
  // 打印结果
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
})
