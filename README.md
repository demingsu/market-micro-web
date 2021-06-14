## micro-web 微前端开发库说明
---

#### 项目说明
---
1. 项目是一个Vue 微前端开发框架
2. 其中 root-pkg 为项目的启动开发库，其中使用 System 作为微服务的库加载框架，single-spa 为微前端单个项目的应用注册框架
3. main-pkg 开发框架为整个项目的默认启动项目
4. 子应用的开发可以参考 base-pkg 项目

#### 项目运行
---
1. 项目开发的启动顺序为：base-pkg -> main-pkg -> root-pkg
2. 项目发布可以使用 nginx，需要在 nginx 中配置代理