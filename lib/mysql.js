

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
// 统计 start
let selectCountByDate = function(date,isAdmin){
    let _sql = `select count(1) as count from Users u `
    if(date){
        _sql+=`where DATE_FORMAT(u.CreateTime,"%Y-%m-%d") = '${date}'`
    }
    if(isAdmin!=undefined){
        if(date){
            _sql +=' and '
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
// end start

// 地址 start


// 插入用户地址
let insertUserAddress = function(value){
    let _sql = "insert into Users_Address(UserId,Name,Phone,Address,IsDefault) values(?,?,?,?,?);"
    return query(_sql,value);
}
// 更新用户地址
let updateUserAddress = function(value){
    let _sql = "update Users_Address u set u.Name=?,u.Phone=?,u.Address=?,u.IsDefault=? where u.Id=?"
    return query(_sql,value);
}
// 删除用户地址
let deleteUserAddress = function(id){
    let _sql = `delete from Users_Address where Id=${id}`
    return query(_sql);
}
let selectAllUserAddress = function(globalName,pageNo,pageSize){
    let _sql = `select ua.Id,ua.Name,u.Username,ua.UserId,ua.Phone,ua.Address,ua.IsDefault from Users_Address ua left join Users u on ua.UserId=u.Id
    where ua.Name like '%${globalName}%' or ua.Phone like '%${globalName}%' or ua.Address like '%${globalName}%' 
     limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectAllUserAddressLength = function(globalName){
    let _sql = `select count(1) as count from Users_Address ua 
    where ua.Name like '%${globalName}%' or ua.Phone like '%${globalName}%' or ua.Address like '%${globalName}%'`
    return query(_sql);
}
// 查询用户地址
let selectUserAddress = function(id){
    let _sql = "select ua.Id,ua.Name,u.Username,ua.UserId,ua.Phone,ua.Address,ua.IsDefault from Users_Address ua left join Users u on ua.UserId=u.Id"
    if(id){_sql+=` where ua.UserId=${id}`}
    return query(_sql);
}
// 查询是否已经存在默认地址
let selectUserDefaultAddress = function(UserId){
    let _sql = `select ua.Id from Users_Address ua where ua.UserId=${UserId} and ua.IsDefault=1`
    return query(_sql);
}
// 更改默认地址
let updateUserDefaultAddress = function(Id,IsDefault){
    let _sql = `update Users_Address ua set ua.IsDefault=${IsDefault} where ua.Id=${Id}`
    return query(_sql);
}
// end 地址



// 注册用户
let register = function(value){
    let _sql = "insert into Users(Username,Password,Email) values(?,?,?);"
    return query(_sql,value);
}
// 插入用户信息
let insertUserInfo = function(value){
    let _sql = "insert into Users(Username,Avatar,Email,IsAdmin) values(?,?,?,?);"
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
    let _sql = `select Id,Username,Avatar,IsAdmin,Email,Password from Users where Id='${id}'`
    return query(_sql);
}
// 修改用户头像
let upladAvatarById = function(value){
    let _sql = `update Users set Avatar=? where Id=?`
    return query(_sql,value);
}

let changePwd = function(value){
    let _sql = `update Users set Password=? where Id=?`
    return query(_sql,value);
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
    if(searchData.isAdmin!=undefined){
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
    _sql+=` order by u.CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
let selectUserInfoLength = function(globalName,isAdmin){
    let _sql = `select count(1) as count from Users u `
    if(globalName){
        _sql+= `where u.Username like '%${globalName}%' or u.Email like '%${globalName}%' `
        _sql+=isAdmin?'and ':''
    }
    if(isAdmin!=undefined){
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

// 旅行必备物品-商品 start 
const getGoodsList = function(searchData){
    let _sql = "select * from goods "
    if(searchData.globalName){
        _sql+= `where Name like '%${searchData.globalName}%' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
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
    let _sql = "insert into goods(Name,Photo,Type,Price,Status,Num,Detail) values(?,?,?,?,?,?,?);"
    return query(_sql,value);
}
const findGoodsById= function(id){
    let _sql = "select * from goods where Id = "+id;
    return query(_sql);
}
const findGoodsByIds= function(ids){
    let _sql = `select * from goods g where Id in (${ids})`
    return query(_sql);
}
const updateGoods= function(value){
    let _sql = "update goods set Name=?,Photo=?,Type=?,Price=?,Status=?,Num=?,Detail=? where Id=?"
    return query(_sql,value);
}
const updateGoodsNumById= function(value){
    let _sql = `update goods set Num=${quantity} where Id=${id}`
    return query(_sql,value);
}
const deleteGoods= function(id){
    let _sql = "delete from goods where Id = "+id;
    return query(_sql);
}
// end 旅行必备物品


// 攻略信息评论 start
let selectCommentByStrategyId =function(id){
    let _sql =`select c.*,u.Username,u.Avatar from strategy_info_comments c left join Users u on u.Id=c.UserId where c.StrategyInfoId=${id}`
    return query(_sql);
}
// end 攻略信息评论


// 必备物品评论 start
let selectCommentByGoodsId =function(GoodsId){
    let _sql =`select c.*,u.Username,u.Avatar from good_comments c left join Users u on u.Id=c.UserId where c.GoodsId=${GoodsId}`
    return query(_sql);
}
let insertComment =function(value){
    let _sql ="insert into good_comments(UserId,GoodsId,Content) values(?,?,?);"
    return query(_sql,value);
}
let selectCommentInfo =function(globalName,pageNo,pageSize){
    let _sql =`select c.*,u.Username,u.Avatar from good_comments c left join Users u on c.UserId=u.Id left join goods g on g.Id=c.GoodsId where g.Name like '%${globalName}%' or u.Username like '%${globalName}%' limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectCommentInfoLength =function(globalName){
    let _sql =`select count(1) as count from good_comments c left join Users u on c.UserId=u.Id left join goods g on g.Id=c.GoodsId where g.Name like '%${globalName}%' or u.Username like '%${globalName}%'`
    return query(_sql);
}
let deleteCommentInfo =function(id){
    let _sql =`delete from good_comments where Id=${id}`
    return query(_sql);
}
// end 必备物品评论

// 火车票 start
const getTrainList = function(searchData){
    let _sql = "select * from train_tickets "
    if(searchData.globalName){
        _sql+= `where TrainCode like '%${searchData.globalName}%' or StartPlace = '${searchData.globalName}' or EndPlace = '${searchData.globalName}' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
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
// end 火车票


// 火车票评论 start
let selectCommentByTrainId =function(TrainId){
    let _sql =`select c.*,u.Username,u.Avatar from train_tickets_comments c left join Users u on u.Id=c.UserId where c.TrainId=${TrainId}`
    return query(_sql);
}
let insertTrainComment =function(value){
    let _sql ="insert into train_tickets_comments(UserId,TrainId,Content) values(?,?,?);"
    return query(_sql,value);
}
let selectTrainCommentInfo =function(globalName,pageNo,pageSize){
    let _sql =`select c.*,u.Username,u.Avatar from train_tickets_comments c left join Users u on c.UserId=u.Id left join train_tickets t on t.Id=c.TrainId where t.TrainCode like '%${globalName}%' or u.Username like '%${globalName}%' limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectTrainCommentInfoLength =function(globalName){
    let _sql =`select count(1) as count from train_tickets_comments c left join Users u on c.UserId=u.Id left join train_tickets t on t.Id=c.TrainId where t.TrainCode like '%${globalName}%' or u.Username like '%${globalName}%'`
    return query(_sql);
}
let deleteTrainCommentInfo =function(id){
    let _sql =`delete from train_tickets_comments where Id=${id}`
    return query(_sql);
}
// end 火车票评论

// 经停站 start
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
// end 经停站

// 列表座位 start
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
// end 列表座位

// 攻略信息 start
const getStrategyList = function(searchData){
    let _sql = "select * from strategy_info "
    if(searchData.globalName){
        _sql+= `where Title like '%${searchData.globalName}%' or Address = '%${searchData.globalName}%' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getStrategyLength = function(searchData){
    let _sql = "select count(1) count from strategy_info "
    if(searchData.globalName){
        _sql+= `where Title like '%${searchData.globalName}%' or Address = '%${searchData.globalName}%' `
    }
    return query(_sql);
}
const insertStrategy= function(value){
    let _sql = "insert into strategy_info(Title,Pictures,Content,Address) values(?,?,?,?);"
    return query(_sql,value);
}
const findStrategyById= function(id){
    let _sql = "select * from strategy_info where Id = "+id;
    return query(_sql);
}
const updateStrategy= function(value){
    let _sql = "update strategy_info set Title=?,Pictures=?,Content=?,Address=? where Id=?"
    return query(_sql,value);
}
const deleteStrategy= function(id){
    let _sql = "delete from strategy_info where Id = "+id;
    return query(_sql);
}
// end 攻略信息


// 旅游景点 start
const getTouristSpotList = function(searchData){
    let _sql = "select * from tourist_spots "
    if(searchData.globalName){
        _sql+= `where Name = '${searchData.globalName}' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getTouristSpotLength = function(searchData){
    let _sql = "select count(1) count from tourist_spots "
    if(searchData.globalName){
        _sql+= `where Name = '${searchData.globalName}' `
    }
    return query(_sql);
}
const insertTouristSpot= function(value){
    let _sql = "insert into tourist_spots(Name,Pictures,Detail,Address) values(?,?,?,?);"
    return query(_sql,value);
}
const findTouristSpotById= function(id){
    let _sql = "select * from tourist_spots where Id = "+id;
    return query(_sql);
}
const updateTouristSpot= function(value){
    let _sql = "update tourist_spots set Name=?,Pictures=?,Detail=?,Address=? where Id=?;"
    return query(_sql,value);
}
const deleteTouristSpot= function(id){
    let _sql = "delete from tourist_spots where Id = "+id;
    return query(_sql);
}
// end 旅游景点

// 旅游景点门票 start
const getTouristSpotTicketList = function(searchData){
    let _sql = "select tst.*,ts.Name from tourist_spots_ticket tst left join tourist_spots ts on ts.TouristSpotId = tst.Id"
    if(searchData.Type){
        _sql+= `where tst.Type = ${searchData.Type} `
    }
    if(searchData.Name){
        if(searchData.Type){
            _sql+= "where "
        }else{
            _sql+= "and "
        }
        _sql+= `ts.Name = '${searchData.Name}' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getTouristSpotTicketLength = function(searchData){
    let _sql = "select count(1) count from tourist_spots_ticket tst left join tourist_spots ts on ts.TouristSpotId = tst.Id"
    if(searchData.Type){
        _sql+= `where tst.Type = ${searchData.Type} `
    }
    if(searchData.Name){
        if(searchData.Type){
            _sql+= "where "
        }else{
            _sql+= "and "
        }
        _sql+= `ts.Name = '${searchData.Name}' `
    }
    return query(_sql);
}
const insertTouristSpotTicket= function(value){
    let _sql = "insert into tourist_spots_ticket(TouristSpotId,Type,Num,Price,Status,AppointTime,AppointUserIds) values(?,?,?,?,?,?,?);"
    return query(_sql,value);
}
const findTouristSpotTicketById= function(id){
    let _sql = "select * from tourist_spots_ticket where Id = "+id;
    return query(_sql);
}
const findTouristSpotTicketByTouristSpotId= function(id){
    let _sql = "select * from tourist_spots_ticket where TouristSpotId = "+id;
    return query(_sql);
}
const updateTouristSpotTicket= function(value){
    let _sql = "update tourist_spots_ticket set TouristSpotId=?,Type=?,Num=?,Price=?,Status=?,AppointTime=?,AppointUserIds=? where Id=?;"
    return query(_sql,value);
}
const updateTicketAppointById= function(value){
    let _sql = "update tourist_spots_ticket set Num=?,AppointUserIds=? where Id=?;"
    return query(_sql,value);
}
const deleteTouristSpotTicket= function(id){
    let _sql = "delete from tourist_spots_ticket where Id = "+id;
    return query(_sql);
}
// end 旅游景点门票

// 旅游景点评论 start
let selectCommentByTouristSpotId =function(TouristSpotId){
    let _sql =`select c.*,u.Username,u.Avatar from tourist_spots_comments c left join Users u on u.Id=c.UserId where c.TouristSpotId=${TouristSpotId}`
    return query(_sql);
}
let insertTouristSpotComment =function(value){
    let _sql ="insert into tourist_spots_comments(UserId,TouristSpotId,Content) values(?,?,?);"
    return query(_sql,value);
}
let selectTouristSpotCommentInfo =function(globalName,pageNo,pageSize){
    let _sql =`select c.*,u.Username,u.Avatar from tourist_spots_comments c left join Users u on c.UserId=u.Id left join tourist_spots t on t.Id=c.TouristSpotId where t.Name like '%${globalName}%' or u.Username like '%${globalName}%' limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectTouristSpotCommentInfoLength =function(globalName){
    let _sql =`select count(1) as count from tourist_spots_comments c left join Users u on c.UserId=u.Id left join tourist_spots t on t.Id=c.TouristSpotId where t.Name like '%${globalName}%' or u.Username like '%${globalName}%'`
    return query(_sql);
}
let deleteTouristSpotCommentInfo =function(id){
    let _sql =`delete from tourist_spots_comments where Id=${id}`
    return query(_sql);
}
// end 旅游景点评论

// 酒店 start
const getHotelList = function(searchData){
    let _sql = "select * from hotels "
    if(searchData.globalName){
        _sql+= `where Name = '${searchData.globalName}' `
    }
    _sql+=` order by CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getAllHotelList = function(){
    let _sql = "select Id,Name from hotels"
    return query(_sql);
}
const getHotelLength = function(searchData){
    let _sql = "select count(1) count from hotels "
    if(searchData.globalName){
        _sql+= `where Name = '${searchData.globalName}' `
    }
    return query(_sql);
}
const insertHotel= function(value){
    let _sql = "insert into hotels(Name,Pictures,Detail,Address,HasBreakfast,HasWifi) values(?,?,?,?,?,?);"
    return query(_sql,value);
}
const findHotelById= function(id){
    let _sql = "select * from hotels where Id = "+id;
    return query(_sql);
}
const updateHotel= function(value){
    let _sql = "update hotels set Name=?,Pictures=?,Detail=?,Address=?,HasBreakfast=?,HasWifi=? where Id=?;"
    return query(_sql,value);
}
const deleteHotel= function(id){
    let _sql = "delete from hotels where Id = "+id;
    return query(_sql);
}
// end 酒店

// 酒店评论 start
let selectCommentByHotelId =function(HotelId){
    let _sql =`select c.*,u.Username,u.Avatar from hotels_comments c left join Users u on u.Id=c.UserId where c.HotelId=${HotelId}`
    return query(_sql);
}
let insertHotelComment =function(value){
    let _sql ="insert into hotels_comments(UserId,HotelId,Content) values(?,?,?);"
    return query(_sql,value);
}
let selectHotelCommentInfo =function(globalName,pageNo,pageSize){
    let _sql =`select c.*,u.Username,u.Avatar from hotels_comments c left join Users u on c.UserId=u.Id left join Hotels h on h.Id=c.HotelId where h.Name like '%${globalName}%' or u.Username like '%${globalName}%' limit ${pageNo},${pageSize}`
    return query(_sql);
}
let selectHotelCommentInfoLength =function(globalName){
    let _sql =`select count(1) as count from hotels_comments c left join Users u on c.UserId=u.Id left join Hotels h on h.Id=c.HotelId where h.Name like '%${globalName}%' or u.Username like '%${globalName}%'`
    return query(_sql);
}
let deleteHotelCommentInfo =function(id){
    let _sql =`delete from hotels_comments where Id=${id}`
    return query(_sql);
}
// end 酒店评论

// 酒店房间 start
const getRoomList = function(searchData){
    let _sql = "select r.*,h.Name HotelName from hotel_room r left join hotels h on h.Id = r.HotelId "
    if(searchData.globalName){
        _sql+= `where h.Name = '${searchData.globalName}' or r.RoomCode = '${searchData.globalName}' `
    }
    _sql+=` order by r.CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getRoomLength = function(searchData){
    let _sql = "select count(1) count from hotel_room r left join hotels h on h.Id = r.HotelId "
    if(searchData.globalName){
        _sql+= `where h.Name = '${searchData.globalName}' or r.RoomCode = '${searchData.globalName}' `
    }
    return query(_sql);
}
const insertRoom= function(value){
    let _sql = "insert into hotel_room(HotelId,RoomCode,Pictures,BedType,Price) values(?,?,?,?,?);"
    return query(_sql,value);
}
const findRoomById= function(id){
    let _sql = "select r.*,h.Name HotelName from hotel_room r left join hotels h on h.Id = r.HotelId where r.Id = "+id;
    return query(_sql);
}
const updateRoom= function(value){
    let _sql = "update hotel_room set HotelId=?,RoomCode=?,Pictures=?,BedType=?,Price=? where Id=?;"
    return query(_sql,value);
}
const deleteRoom= function(id){
    let _sql = "delete from hotel_room where Id = "+id;
    return query(_sql);
}
// end 酒店房间

// 预约房间 start
const selectHotelRoomAppoint= function(value){
    let _sql = "select * from hotel_room_appoint where HotelId = ? and RoomId = ? and UserId = ?;"
    return query(_sql,value);
}
const insertHotelRoomAppoint= function(value){
    let _sql = "insert into hotel_room_appoint(HotelId,RoomId,UserId) values(?,?,?);"
    return query(_sql,value);
}
const deleteHotelRoomAppoint= function(value){
    let _sql = "delete from hotel_room_appoint where HotelId = ? and RoomId = ? and UserId = ?;"
    return query(_sql,value);
}
// end 预约房间

// 酒店订单 start
const getHotelOrderList = function(searchData){
    let _sql = "select o.*,r.RoomCode,r.BedType,h.Name HotelName from hotel_room_orders o lejt join hotel_room r on o.RoomId=Id lejt join hotels h on h.Id=r.HotelId "
    let whereStr = []
    if(searchData.globalName){
        whereStr.push(`o.Name = '${searchData.globalName}' or o.IdCardNumber = '%${searchData.globalName}%' or r.RoomCode = '%${searchData.globalName}%'`)
    }
    if(searchData.hotelName){
        whereStr.push(`h.Name = '${searchData.globalName}'`)
    }
    if(searchData.globalName||searchData.hotelName){
        _sql+=" where "+whereStr.join(' and ');
    }
    _sql+=` order by o.CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getHotelOrderLength = function(searchData){
    let _sql = "select count(1) count from hotel_room_orders o lejt join hotel_room r on o.RoomId=Id lejt join hotels h on h.Id=r.HotelId "
    let whereStr = []
    if(searchData.globalName){
        whereStr.push(`o.Name = '${searchData.globalName}' or o.IdCardNumber = '%${searchData.globalName}%' or r.RoomCode = '%${searchData.globalName}%'`)
    }
    if(searchData.hotelName){
        whereStr.push(`h.Name = '${searchData.globalName}'`)
    }
    if(searchData.globalName||searchData.hotelName){
        _sql+=" where "+whereStr.join(' and ');
    }
    return query(_sql);
}
const deleteHotelOrder= function(id){
    let _sql = "delete from hotel_room_orders where Id = "+id;
    return query(_sql);
}
// end  酒店订单

// 社区服务 start
const getCommunityList = function(searchData){
    let _sql = "select c.*,u.Username from community c left join users u on u.Id = c.UserId "
    if(searchData.globalName){
        _sql+= `where u.Username = '${searchData.globalName}' `
    }
    _sql+=` order by c.CreateTime desc limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`
    return query(_sql);
}
const getCommunityLength = function(searchData){
    let _sql = "select count(1) count from community c left join users u on u.Id = c.UserId "
    if(searchData.globalName){
        _sql+= `where u.Username = '${searchData.globalName}' `
    }
    return query(_sql);
}
const insertCommunity= function(value){
    let _sql = "insert into community(UserId,Content) values(?,?);"
    return query(_sql,value);
}
const insertCommunityItem= function(value){
    let _sql = "insert into community(UserId,Content,ParentId) values(?,?,?);"
    return query(_sql,value);
}
const findCommunityById= function(id){
    let _sql = "select c.*,u.Username from community c left join users u on u.Id = c.UserId where c.Id = "+id;
    return query(_sql);
}
const updateCommunity= function(value){
    let _sql = "update community set UserId=?,Content=? where Id=?;"
    return query(_sql,value);
}
const updateCommunityPraiseById= function(value){
    let _sql = "update community set PraiseNum=?,PraiseUserIds=? where Id=?;"
    return query(_sql,value);
}
const deleteCommunity= function(id){
    let _sql = "delete from community where Id = "+id;
    return query(_sql);
}
// end 社区服务

// 新增支付
let insertAliPay =function(value){
    let _sql =`insert into Goods_Alipay(UserId,GoodsId,UserAddressId,Seller_Id,Out_Trade_No,Trade_No,Quantity,Total_Amount) values ${value}`
    return query(_sql);
}

//暴露所有函数接口
module.exports = {
    query,
    // 新增支付
    insertAliPay,
    // 酒店评论
    selectCommentByHotelId,
    insertHotelComment,
    insertHotelComment,
    selectHotelCommentInfo,
    selectHotelCommentInfoLength,
    deleteHotelCommentInfo,
    // 酒店订单
    getHotelOrderList,
    getHotelOrderLength,
    deleteHotelOrder,
    // 统计
    selectCountByDate,
    // 用户
    upladAvatarById,
    changePwd,
    register,
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
    // 地址
    selectAllUserAddress,
    selectAllUserAddressLength,
    selectUserAddress,
    deleteUserAddress,
    updateUserAddress,
    insertUserAddress,
    selectUserDefaultAddress,
    updateUserDefaultAddress,
    // 轮播图
    findAllCarousel,
    // 商品信息
    findGoodsByIds,
    findGoodsById,
    getGoodsList,
    getGoodsLength,
    insertGoods,
    updateGoods,
    updateGoodsNumById,
    deleteGoods,
    // 商品评论
    selectCommentByGoodsId,
    insertComment,
    selectCommentInfo,
    selectCommentInfoLength,
    deleteCommentInfo,
    // 攻略信息评论 
    selectCommentByStrategyId,
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
    getTrainSeatByTicketId,
    // 火车票评论
    selectCommentByTrainId,
    insertTrainComment,
    selectTrainCommentInfo,
    selectTrainCommentInfoLength,
    deleteTrainCommentInfo,
    // 攻略信息
    getStrategyList,
    getStrategyLength,
    insertStrategy,
    updateStrategy,
    deleteStrategy,
    findStrategyById,
    // 旅游景点
    getTouristSpotList,
    getTouristSpotLength,
    insertTouristSpot,
    updateTouristSpot,
    deleteTouristSpot,
    findTouristSpotById,
    // 旅游景点门票
    getTouristSpotTicketList,
    getTouristSpotTicketLength,
    insertTouristSpotTicket,
    findTouristSpotTicketById,
    findTouristSpotTicketByTouristSpotId,
    updateTouristSpotTicket,
    updateTicketAppointById,
    deleteTouristSpotTicket,
    // 旅游景点评论
    selectCommentByTouristSpotId,
    insertTouristSpotComment,
    selectTouristSpotCommentInfo,
    selectTouristSpotCommentInfoLength,
    deleteTouristSpotCommentInfo,
    // 酒店
    getHotelList,
    getAllHotelList,
    getHotelLength,
    insertHotel,
    updateHotel,
    deleteHotel,
    findHotelById,
    // 酒店房间
    getRoomList,
    getRoomLength,
    insertRoom,
    updateRoom,
    deleteRoom,
    findRoomById,
    // 预约房间
    selectHotelRoomAppoint,
    insertHotelRoomAppoint,
    deleteHotelRoomAppoint,
    // 社区服务
    getCommunityList,
    getCommunityLength,
    insertCommunity,
    insertCommunityItem,
    updateCommunity,
    updateCommunityPraiseById,
    deleteCommunity,
    findCommunityById
}
