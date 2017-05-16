

# 项目依赖

* webpack^2.3.2
* antd-mobile^1.1.3
* react^15.5.4
* react-router-dom^4.0.0


# 运行

```
npm install(如果报错，请使用cnpm) 
npm run start -- 127.0.0.1
```

然后即可以访问[http://127.0.0.1:1024](http://127.0.0.1:1024)看到页面了

# 编译

```
npm run build
```

编译后的文件会生成到`output`目录下，直接将这个目录下的文件部署到服务器上即可。



# 目录结构

```
.
├── src
│   ├── app
│   │   ├── images/
│   │   ├── index.js
│   │   └── list.js
│   ├── home
│   │   ├── images/
│   │   ├── index.js
│   │   └── list.js
│   ├── home.js
│   ├── app.js
│   ├── bundle.js
│   └── template.ejs
├── output
│   ├── images/
│   ├── **.html
│   ├── **.css
│   └── **.js
├── config
│   ├── config.page.js
│   ├── config.server.js
│   └── config.proxy.js
├── mock
│   └── **.json
├── .babelrc
├── .eslintrc
├── package.json
└── webpack.config.js
```

1. 其中`home`和`app`是两个单独的页面
2. `src/template.ejs`为生成HTML文件的模板，可自由修改
3. `src/bundle.js`是代码分割模型
4. `output/`目录下是build后的生成文件，可直接不熟到服务器


# 多页面入口配置

如果想在项目里面增加入口，只需要在`./config/config.page.js`中增加配置即可

```
module.exports = {
    "list": [{
        "name": "app",
        "entry": "./app.js",
        "title": "app页面",
        "filename": "app.html",
        "template": "template.ejs",
        "chunks": "app"
    }, {
        "name": "home",
        "entry": "./home.js",
        "title": "home页面",
        "filename": "home.html",
        "template": "template.ejs",
        "chunks": "home"
    }]
}
```


# todoList

1. ~~支持多入口（3.30 done）~~
2. ~~common拆分（暂时不做）~~
3. ~~静态文件加戳（3.31 done）~~
4. ~~dev-server配置（4.6 done）~~
5. ~~目录结构优化（4.7 done）~~
6. ~~webpack配置拆分（暂时不需要）~~
7. ~~使用react-router路由（3.30 done）~~
8. ~~fetch语法支持（4.1 done）~~
9. ~~静态文件输出（3.31 done）~~
10. ~~打包后js文件过大（3.31 做压缩处理 4.20 做代码拆分）~~
11. ~~热更新（4.5 done）~~
12. ~~css打包存在问题（4.5 done）~~
13. ~~验证多less文件的合并情况（4.6 done）~~
14. ~~图片目录（4.7 done）~~
15. ~~css压缩（4.24 done）~~
16. ~~代码拆分（4.20 done）~~




# future

1. redux
2. deploy
3. 。。。


# hot和inline的区别

webpack-dev-server的inline和hot参数都可以在代码改变的时候实现浏览器页面自动更新，具体的区别请参考我的博客[webpack-dev-server中inline和HMR的区别](http://1.molinblog.applinzi.com/blog/webpack-dev-server.html)

# react-router4如何做Code Splitting

react-router4做按需加载，需要使用[bundle-loader](https://github.com/webpack-contrib/bundle-loader)来实现。具体请参考[react-router4实现按需加载](http://1.molinblog.applinzi.com/blog/code-splitting.html)

# 如何在react项目中使用ESlint检测代码规范

ESLint是js中目前比较流行的插件化的静态代码检测工具。通过使用它可以保证高质量的代码，尽量减少和提早发现一些错误。使用eslint可以在工程中保证一致的代码风格，特别是当工程变得越来越大、越来越多的人参与进来时，需要加强一些最佳实践。

[如何在react项目中使用ESlint检测代码规范](https://juejin.im/post/58ff0de18d6d810058a69a26)

# 对于deploy的设想

使用gulp-sftp（或其他）实现文件上传到服务器上的指定目录


