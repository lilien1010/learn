## 前言
```
就是随便写写而已，学习各种乱七八糟的东西
```

## 源码说明
### 项目目录说明
```
.
|-- vue                             // vue 前端项目
|                                   // 项目打包部署配置
|-- vue2-demo                       // 学习vue的O(∩_∩)O哈哈~
```

### 开发环境依赖模块说明
#### webpack相关模块
```
webpack                               // 用来构建打包程序
webpack-dev-server                    // 开发环境下，设置代理服务器
html-webpack-plugin                   // html 文件编译
url-loader                            // 图片  转化成base64格式
file-loader                           // 字体  将字体文件打包
css-loader                            // css  生成
less                                  // css  预处理器less
less-loader                           // css  预处理器less的webpack插件
style-loader                          // css  插入到style标签
autoprefixer-loader                   // css  浏览器兼容性问题处理
babel-core                            // ES6  代码转换器
babel-loader                          // ES6  代码转换器，webpack插件
babel-plugin-transform-object-assign  // ES6  Object.assign方法做兼容处理
babel-preset-es2015                   // ES6  代码编译成现在浏览器支持的ES5
babel-preset-stage-0                  // ES6  ES7要使用的语法阶段
vue-loader                            // vue  组件编译
babel-helper-vue-jsx-merge-props      // vue  jsx语法编译
babel-plugin-syntax-jsx               // vue  jsx语法编译
babel-plugin-transform-vue-jsx        // vue  jsx语法编译
```

#### gulp相关模块
```
gulp                                  // 用来构建自动化工作流
gulp-sftp                             // 将代码自动部署到服务器上
del                                   // 代码部署成功后，删除本地编译的代码
```
#### 其他模块
```
cross-env                             // 解决跨平台设置NODE_ENV的问题
```
### 生产模块依赖说明
#### vue全家桶
```
vue                                   // 构建用户界面的
vue-router                            // 路由
vuex                                  // 组件状态管理
```
