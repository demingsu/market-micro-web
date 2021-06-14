## micro-web main-pkg 微前端项目的主要容器以及业务控制核心库

### 运行项目
```
1、npm install
2、npm start
```

#### 项目结构
```
|—— main-pkg
    |—— package.json            项目模块管理描述文件
    |—— vue.config.js           项目主要运行文件
    |—— src                     项目主要依赖文件
        |—— apis                接口管理文件
            |—— Ajax.js         axios的封装库
            |—— XxxApi.js       请求方法接口文件
        |—— router              路由
            |—— index.js        路由管理实例方法
        |—— store               状态管理
            |—— index.js        状态管理实例
        |—— style               样式文件
            |—— common.less     通用样式文件
            |—— index.less      全局样式文件
        |—— views               页面组件
            |—— index.vue       全局容器实例
        |—— main.js             项目启动文件
```