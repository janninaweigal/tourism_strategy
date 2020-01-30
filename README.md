# 旅游攻略
用koa2 + ejs + mysql + JWT 开发畅游攻略平台

# 配置JWT
https://segmentfault.com/a/1190000019338195

# 执行步骤
* 1.mysql新建数据库，运行nodesql.sql 脚本文件<br>
* 2.config目录下的default.js 配置mysql参数<br>
* 3.npm install安装依赖<br>
* 3.最后，运行node index<br>

## 目录结构：
* 1.config存放默认文件<br>
* 2.lib存放数据库文件<br>
* 3.middlewares存放判断登陆注册与否文件<br>
* 4.public存放样式文件，js,引用bootstrap框架等文件<br>
* 5.routers存放路由文件<br>
* 6.views存放模板文件<br>
* 7.index是程序主文件，定义接口，数据库接口，引用模块等<br>
* 8.package.json项目的配置文件，包括项目名，作者，依赖，模块等<br>

# es6 -> es5 
npm install --save-dev babel-preset-env babel-cli
*创建.babelrc文件
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}

