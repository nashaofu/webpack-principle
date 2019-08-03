-# webpack 执行流程

说明：为了讲述更简单，这里只以 webpack 配置为一个对象去讲解，数组的情况基本和单个对象是差不多，且运行模式为非 watch 模式

1.  调用 webpac 函数，`webpack(config: obejct, callback: (err, stats) => {})`
2.  验证 config 配置是否合法
3.  格式化配置参数，并初始化 compiler 对象，初始化 compiler 后，compiler 会挂载上各种 hooks，hooks 是基于[tapable](https://github.com/webpack/tapable)实现的
    1. 调用 WebpackOptionsDefaulter 类处理传入的配置，并返回新的配置对象 options
    2. 调用 Compiler 类初始化 compiler 对象，并把 options 对象赋值给 compiler 的 options 属性，
    3. 执行 hooks.environment.call
    4. 执行 compiler.hooks.afterEnvironment
    5. 同时根据 options 自动加载不同环境的配置插件，如 target 不同，对应的配置也不同，此步骤夜壶依次初始化各种 plugin，并且调用 plugin 的 aplly 方法
    6. 执行 hooks.entryOption.call，加载入口文件
    7. 执行 compiler.hooks.afterPlugins.call
    8. 执行 hooks.afterResolvers
4.  如果传入了 callback，那么 webpack 会启动编译，如果没有则返回 compiler 对象
5.  运行 compiler.run
    1. 调用 compiler 的 hooks.beforeRun.callAsync 钩子，在 hook 中传入参数为 compiler 对象
    2. hooks.beforeRun.callAsync 执行完成之后调用 hooks.run.callAsync 钩子，在 hook 中传入参数为 compiler 对象
    3. hooks.normalModuleFactory.call
    4. hooks.contextModuleFactory.call
    5. 以上两步也是对于 compiler 的一些参数配置或者修改，然后调用 hooks.beforeCompile.callAsync 钩子，参数为 compilationParams，形式如下
       ```js
       const compilationParams = {
         normalModuleFactory,
         contextModuleFactory,
         compilationDependencies
       }
       ```
    6. 调用 hooks.compile.call，参数也为 compilationParams
    7. 使用类 Compilation 创建`compilation`对象，然后调用`hooks.thisCompilation.call`钩子，参数为创建的对象`compilation`
    8. 然后调用 hooks.compilation.call 钩子，参数为 compilation 和 compilationParams
    9. 执行 hooks.make.callAsync 钩子，参数为 compilation
    10. 执行 hooks.afterCompile.callAsync
    11. 执行 hooks.shouldEmit.call
    12. this.hooks.emit.callAsync
    13. hooks.afterEmit.callAsync
    14. hooks.done.callAsync
    15. hooks.failed.call
