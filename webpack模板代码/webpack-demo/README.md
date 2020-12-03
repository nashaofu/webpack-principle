# webpack-demo

webpack 原理-webpack 模板代码演示示例代码

## 命令

```bash
yarn build # 打包文件
```

## 文件

```bash
.
├── README.md
├── dist # 打包生成文件
│   ├── 1.js # src/chunk.js => 1.js
│   ├── app.js # src/index.js => app.js
│   └── splitChunk.js # src/splitChunk.js => splitChunk.js
├── package.json
├── src
│   ├── chunk.js # 动态加载的chunk
│   ├── index.js # 非代码切割入口文件
│   └── splitChunk.js # 代码切割入口文件
├── webpack.config.js
└── yarn.lock
```
