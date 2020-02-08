

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
                    connection.release(); //直接释放资源。
                })
            }
        })
    })
}

// 注册用户
let insertUser = function(value){
    let _sql = "insert into Users(Username,Email,IsAdmin,Avatar) values(?,?,?,?);"
    return query(_sql,value);
}
// 查询用户信息
let selectUser = function(value){
    let _sql = "select Username,Password,Avatar,CreateTime from Users where Username=? and Password=? and isAdmin=?";
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
    let _sql = "update Users set UserName=?,Email=?,IsAdmin=?,Avatar=? where Id=?"
    return query(_sql,value);
}
// 查询所有用户
let selectUserInfo = function(searchData){
    let _sql = `select u.Id,u.Username,u.Password,u.Avatar,u.Email,u.IsAdmin,u.CreateTime from Users u `
    if(searchData.globalName){
        _sql+= `where u.Username like '%${searchData.globalName}%' or u.Email like '%${searchData.globalName}%' `
        _sql+=isAdmin?'and ':''
    }
    if(searchData.isAdmin){
        if(!searchData.globalName){
            _sql+=' where '
        }
        switch(searchData.isAdmin){
            case 1:
                _sql+= 'u.IsAdmin = 1';
                break;
            case 0:
                _sql+= 'u.IsAdmin = 0';
                break;
        }
    }
    _sql+=` limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
let selectUserInfoLength = function(globalName,isAdmin){
    let _sql = `select count(1) as count from Users u `
    if(globalName){
        _sql+= `where u.Username like '%${globalName}%' or u.Email like '%${globalName}%' `
        _sql+=isAdmin?'and ':''
    }
    if(isAdmin){
        if(!globalName){
            _sql+=' where '
        }
        switch(isAdmin){
            case 1:
                _sql+= 'u.IsAdmin = 1';
                break;
            case 0:
                _sql+= 'u.IsAdmin = 0';
                break;
        }
    }
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
// --------------------获取商品列表
const getGoodsList = function(searchData){
    let _sql = "select * from goods "
    if(searchData.globalName){
        _sql+= `where Name like '%${searchData.globalName}%' `
    }
    _sql+=`limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getGoodsLength = function(searchData){
    let _sql = "select count(1) count from goods "
    if(searchData.globalName){
        _sql+= `where Name like '%${searchData.globalName}%' `
    }
    return query(_sql);
}
const insertGoods= function(value){
    let _sql = "insert into goods(Name,Photo,Type,Price,Status,Num) values(?,?,?,?,?,?);"
    return query(_sql,value);
}
const findGoodsById= function(id){
    let _sql = "select * from goods where Id = "+id;
    return query(_sql);
}
const updateGoods= function(value){
    let _sql = "update goods set Name=?,Photo=?,Type=?,Price=?,Status=?,Num=? where Id=?"
    return query(_sql,value);
}
const deleteGoods= function(id){
    let _sql = "delete from goods where Id = "+id;
    return query(_sql);
}
// --------------------火车票
const getTrainList = function(searchData){
    let _sql = "select * from train_tickets "
    if(searchData.globalName){
        _sql+= `where TrainCode like '%${searchData.globalName}%' or StartPlace = '${searchData.globalName}' or EndPlace = '${searchData.globalName}' `
    }
    _sql+=`limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getTrainLength = function(searchData){
    let _sql = "select count(1) count from train_tickets "
    if(searchData.globalName){
        _sql+= `where TrainCode like '%${searchData.globalName}%' or StartPlace = '${searchData.globalName}' or EndPlace = '${searchData.globalName}' `
    }
    return query(_sql);
}
const insertTrain= function(value){
    let _sql = "insert into train_tickets(TrainCode,Type,StartPlace,EndPlace,ArriveTime,DepartTime,SeatDes,StopOverDes) values(?,?,?,?,?,?,?,?);"
    return query(_sql,value);
}
const findTrainById= function(id){
    let _sql = "select * from train_tickets where Id = "+id;
    return query(_sql);
}
const updateTrain= function(value){
    let _sql = "update train_tickets set StartPlace=?,EndPlace=?,ArriveTime=?,DepartTime=?,SeatDes=?,StopOverDes=? where Id=?"
    return query(_sql,value);
}
const deleteTrain= function(id){
    let _sql = "delete from train_tickets where Id = "+id;
    return query(_sql);
}
// 经停站
const deleteTrainStationByTicketId= function(id){
    let _sql = "delete from train_tickets_stopover_station where TicketId = "+id;
    return query(_sql);
}
const insertBatchTrainStation= function(values){
    let _sql = "insert into train_tickets_stopover_station(TicketId,Place,ArriveTime,DepartTime,Sequence) values"+values.join('')
    return query(_sql);
}
const getTrainStationByTicketId= function(id){
    let _sql = "select Place,ArriveTime,DepartTime from train_tickets_stopover_station where TicketId = "+id+" order by Sequence";
    return query(_sql);
}
// 列表座位
const insertBatchTrainSeat= function(values){
    let _sql = "insert into train_tickets_seats(TicketId,Type,Price,Quantity) values"+values.join('')
    return query(_sql);
}
const deleteTrainSeatByTicketId= function(id){
    let _sql = "delete from train_tickets_seats where TicketId = "+id;
    return query(_sql);
}
const getTrainSeatByTicketId= function(id){
    let _sql = "select Type,Price,Quantity from train_tickets_seats where TicketId = "+id;
    return query(_sql);
}
//暴露所有函数接口
module.exports = {
    query,
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
    updateUserImg,
    deleteUserInfo,
    // 轮播图
    findAllCarousel,
    // 商品信息
    findGoodsById,
    getGoodsList,
    getGoodsLength,
    insertGoods,
    updateGoods,
    deleteGoods,
    // 火车票
    getTrainList,
    getTrainLength,
    insertTrain,
    updateTrain,
    deleteTrain,
    findTrainById,
    deleteTrainStationByTicketId,
    insertBatchTrainStation,
    insertBatchTrainSeat,
    deleteTrainSeatByTicketId,
    getTrainStationByTicketId,
    getTrainSeatByTicketId
}
