var router = require('koa-router')();
import {commonJson} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');

router.post('/room/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getRoomLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getRoomList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/room/insert', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertRoom([params.HotelId,params.RoomCode,params.Pictures,params.BedType,params.Price]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/room', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findRoomById(id).then(res=>{
        if(res.length==1){
            response.data = res[0];
        }else{
            response.flag = false;
            response.msg = '查询失败'
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '查询失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/room/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findRoomById(params.Id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateRoom([params.HotelId,params.RoomCode,params.Pictures,params.BedType,params.Price,params.Id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/room/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let response = {
        flag: true,
        data: null,
        msg: '删除成功'
    }
    if(id){
        await userModel.findRoomById(id).then(res=>{
            if(res.length==1){
                response.data = res[0];
            }else{
                response.flag = false;
                response.msg = '删除失败'
            }
        }).catch(error=>{
            response.flag = false;
            response.msg = '删除失败,错误原因：'+error
        })
        if(response.data.IsUse==1){
            response.msg = '已有客人居住，无法删除'
        }else{
            await userModel.deleteRoom(id).then(res=>{
                flag = true
            }).catch(error=>{
                response.flag = false;
                response.msg = '删除失败,错误原因：'+error
            })
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.post('/room/appointRoom', async(ctx, next) => {
    const params = ctx.request.body
    const userId = ctx.session.id
    let response = {
        flag: true,
        data: null,
        msg: '预约成功，有效期两小时'
    }
    await userModel.selectHotelRoomAppoint([params.roomId,userId]).then(res=>{
        if(res.length==1){
            response.data = res[0]
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '预约失败,错误原因：'+error
    })
    if(response.flag){
        const data = response.data
        if(data==null){
            //直接添加
            await userModel.insertHotelRoomAppoint([params.roomId,userId,params.name,params.idCardNumber,params.phone,params.appointTime]).then(res=>{
                response.data = res;
            }).catch(error=>{
                response.flag = false;
                response.msg = '预约失败,错误原因：'+error
            })
        }else{
            // 判断超过两小时
            if(new Date().getTime()-new Date(data.CreateTime).getTime()>7200000){
                response.flag = false;
                response.msg = '预约时间超过两小时未支付，自动取消'
                //删除掉
                await userModel.deleteHotelRoomAppoint([params.roomId,userId]).then(res=>{
                    response.data = res;
                })
            } else if(response.data.UserId==userId){
                response.flag = false;
                response.msg = '已经预约过了，请到个人中心支付'
            }
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
// 取消预约
router.delete('/room/deleteAppointRoom/:id', async(ctx, next) => {
    const id=ctx.params.id
    let response = {
        flag: true,
        data: null,
        msg: '取消成功'
    }
    //删除预约
    await userModel.deleteHotelRoomAppointById(id).then(res=>{
        response.data = res;
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
// 预约之后支付
router.post('/room/appointRoomOrder/:id', async(ctx, next) => {
    const id=ctx.params.id
    let response = {
        flag: true,
        data: null,
        msg: '支付成功'
    }
    // 找出房间
    await userModel.selectHotelRoomAppointById(id).then(res=>{
        response.data = res[0];
    }).catch(error=>{
        response.flag = false;
        response.msg = '支付失败,错误原因：'+error
    })
    if(response.flag){
        if(response.data.IsUse==0){
            await userModel.updateRoomUseById(1,response.data.RoomId).then(res=>{
                
            }).catch(error=>{
                response.flag = false;
                response.msg = '支付失败,错误原因：'+error
            })
            // 添加订单
            await userModel.insertHotelRoomOrder([id]).then(res=>{
                response.data = res;
            }).catch(error=>{
                response.flag = false;
                response.msg = '支付失败,错误原因：'+error
            })
        } else {
            response.flag = false;
            response.msg = '支付失败,该房间已被人预先支付'
        }
    }
    
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

// 退房
router.put('/room/checkoutRoom/:id', async(ctx, next) => {
    const id=ctx.params.id
    let response = {
        flag: true,
        data: null,
        msg: '退房成功'
    }
    // 找出房间
    await userModel.selectHotelRoomAppointById(id).then(res=>{
        response.data = res[0];
    }).catch(error=>{
        response.flag = false;
        response.msg = '退房失败,错误原因：'+error
    })
    if(response.flag){
        // 删除预约信息
        await userModel.deleteHotelRoomAppointById(id).then(res=>{
        }).catch(error=>{
            response.flag = false;
            response.msg = '退房失败,错误原因：'+error
        })
        // 房间使用变0
        await userModel.updateRoomUseById(0,response.data.RoomId).then(res=>{
        }).catch(error=>{
            response.flag = false;
            response.msg = '退房失败,错误原因：'+error
        })
    }
    
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

module.exports = router