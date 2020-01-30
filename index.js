require('babel-register')
const koa = require("koa");   //node框架
const path = require("path");
const ejs = require("ejs");   //模板引擎
const koaJwt = require("koa-jwt");
const bodyParser = require("koa-bodyparser"); //表单解析中间件
const session = require("koa-session-minimal");   //处理数据库的中间件
const MysqlStore = require("koa-mysql-session");  //处理数据库的中间件
const config = require('./config/default.js');    //引入默认文件
const views = require("koa-views");   //模板呈现中间件
const koaStatic = require("koa-static");  //静态资源加载中间件
const router = require('koa-router')();
const app = new koa();
const constant = require('./constant/index.js')
//session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

//配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

//配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './public')
))

//配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'),{
    extension: 'ejs'
}))

//使用表单解析中间件
app.use(bodyParser({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
}));
//错误
app.use(require('./utils/handle.js'))
//路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(koaJwt({
        secret: constant.secret
    }).unless({path: [/^\/login/, /^\/register/,/^\/exit/,/^\/$/,/^\/api/,/^[\/a-zA-Z]\S+Page$/,/^\/css/,/^\/js/,/^\/images/,/^\/favicon.ico/]})
);
//---------------路由文件
//首页
app.use(require('./routers/home.js').routes())
//登录
app.use(require('./routers/login.js').routes())
//注册
app.use(require('./routers/register.js').routes())
//退出登录
app.use(require('./routers/exit.js').routes())
//测试api
app.use(require('./routers/api.js').routes())
//旅行必备
app.use(require('./routers/pages/goods.js').routes())
//攻略信息
app.use(require('./routers/pages/strategy.js').routes())
//旅游景点
app.use(require('./routers/pages/touristSpot.js').routes())
//订酒店
app.use(require('./routers/pages/hotel.js').routes())
//社区服务
app.use(require('./routers/pages/community.js').routes())
//我的
app.use(require('./routers/pages/personal.js').routes())

//监听端口
app.use(router.routes()).use(router.allowedMethods())
app.listen(config.port) 

console.log(`${config.HOST}${config.port}`)
