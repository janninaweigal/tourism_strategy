

var mysql = require('mysql');
var config = require('../config/default.js')
//建立数据库连接池
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release(); //为每一个请求都建立一个connection使用完后调用connection.release(); 直接释放资源。
                                          //query用来操作数据库表
                })
            }
         
    })
    })
}

// 注册用户
let insertUser = function(value){
    let _sql = "insert into Users(Username,Password,Email) values(?,?,?);"
    return query(_sql,value);
}
// 查询用户信息
let selectUser = function(value){
    let _sql = "select Username,Password from Users where Username=? and Password=?"
    return query(_sql,value);
}
// 通过用户名查询用户信息
let findUserByName = function(username){
    let _sql = `select Id,Username,Avatar,IsAdmin,Email from Users where Username='${username}'`
    return query(_sql);
}
// 通过用户id查询用户信息
let findUserById = function(id){
    let _sql = `select Id,Username,Avatar,IsAdmin,Email from Users where Id='${id}'`
    return query(_sql);
}
// 更新用户信息
let updateUser = function(value){
    let _sql = "update Users set UserName=? where Id=?"
    return query(_sql,value);
}
// 查询所有用户
let selectUserInfo = function(globalName,pageNo,pageSize){
    let _sql = `select u.Id,u.Username,u.Password,u.Avatar,u.Email,u.IsAdmin from Users u
    where u.Username like '%${globalName}%' or u.Email like '%${globalName}%' 
    limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectUserInfoLength = function(){
    let _sql = "select count(1) as count from Users u"
    return query(_sql);
}
// 插入用户信息
let insertUserInfo = function(value){
    let _sql = "insert into Users(Username,Avatar,Email,IsAdmin) values(?,?,?,?);"
    return query(_sql,value);
}
// 更新用户信息 // 与旧头像不同
let updateUserInfo = function(value){
    let _sql = "update Users u set u.Username=?,u.Password=?,u.Avatar=?,u.Email=?,u.IsAdmin=? where u.Id=?"
    return query(_sql,value);
}
// 更新用户信息 // 与旧头像相同
let updateUserInfoNoAvatar = function(value){
    let _sql = "update Users u set u.Username=?,u.Password=?,u.Email=?,u.IsAdmin=? where u.Id=?"
    return query(_sql,value);
}
// 更改头像
let updateUserImg = function(avatar,id){
    let _sql = `update Users u set u.Avatar='${avatar}' where u.Id=${id}`
    return query(_sql);
}
// 删除用户信息
let deleteUserInfo = function(id){
    let _sql = `delete from Users where Id=${id}`
    return query(_sql);
}
// 轮播图
let findAllCarousel = function(){
    let _sql = "select c.Title,c.Describe,c.Picture from Carousel c"
    return query(_sql);
}
//暴露所有函数接口
module.exports = {
    query,
    // createTable,
    // 用户
    insertUser,
    selectUser,
    findUserByName,
    findUserById,
    updateUser,
    selectUserInfo,
    selectUserInfoLength,
    insertUserInfo,
    updateUserInfo,
    updateUserInfoNoAvatar,
    updateUserImg,
    deleteUserInfo,
    // 轮播图
    findAllCarousel
}
