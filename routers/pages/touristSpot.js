var router = require('koa-router')();
import {commonJson} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
router.get('/touristSpotPage', async(ctx, next) => {
    const result = commonJson(ctx)
    const query=ctx.request.query
    const pageNo = parseInt(query.pageNo||1)
    result.touristSpot = {
        list: [],
        count: 0,
        name:'touristSpotPage',
        pageNo:pageNo,
        pageSize:8
    }
    await userModel.query("select count(1) count from tourist_spots").then(res=>{
        result.touristSpot.count = res[0].count
    })
    await userModel.query(`select * from tourist_spots limit ${(result.touristSpot.pageNo-1)*result.touristSpot.pageSize},${result.touristSpot.pageSize}`).then(res=>{
        result.touristSpot.list = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    })
    await ctx.render('pages/touristSpots',result)
})

// 旅游景点详情
router.get('/touristSpotsDetailPage',async(ctx,next)=>{
    const Id=ctx.request.query.id
    let result = commonJson(ctx)
    result.touristSpotsDetail = {}
    result.comments = []
    if(Id){
        await userModel.findTouristSpotById(Id).then(res=>{
            let data = res[0]
            data.Pictures = data.Pictures?JSON.parse(data.Pictures).pictures:{"pictures":[]}
            result.touristSpotsDetail=data;
        })
        await userModel.findTouristSpotTicketByTouristSpotId(Id).then(res=>{
            result.touristSpotsTicketDetail=res;
        })
        await userModel.selectCommentByTouristSpotId(Id).then(res=>{
            result.comments=res
        })
    }
    result.session.type = 4
    await ctx.render('pages/touristSpotsDetail',result)
})

router.post('/touristSpot/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getTouristSpotLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getTouristSpotList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.get('/touristSpot/all', async(ctx, next) => {
    let response = {
        list: [],
        msg: '查询成功'
    }
    await userModel.getAllTouristSpot().then(res=>{
        response.list = res
    })
    ctx.success(response.list,response.msg)
})

router.post('/touristSpot/insert', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertTouristSpot([params.Name,params.Pictures,params.Detail,params.Address]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/touristSpot', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findTouristSpotById(id).then(res=>{
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

router.put('/touristSpot/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findTouristSpotById(params.Id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateTouristSpot([params.Name,params.Pictures,params.Detail,params.Address,params.Id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/touristSpot/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteTouristSpot(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})

// 旅游景点门票
router.post('/touristSpot/ticket', async(ctx, next) => {
    const params = ctx.request.body
    const userId = ctx.session.id
    const touristSpotId  = params.touristSpotId
    const ticketId = params.ticketId
    let response = {
        flag: true,
        data: null,
        msg: '预约成功'
    }
    await userModel.findTouristSpotTicketById(ticketId).then(res=>{
        if(res.length!=1){
            response.flag = false
        } else {
            response.data= res[0]
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '预约失败,错误原因：'+error
    })
    if(response.flag){
        const data = response.data
        if(data.Status==1){
            if(data.AppointNum==0){
                response.flag = false;
                response.msg = '门票已经售空！'
            } else if (new Date().getTime() < new Date(data.AppointTime).getTime()){
                response.flag = false;
                response.msg = '还没到预约时间'
            } else{
                // 更新
                let AppointUserIds = response.data.AppointUserIds||"";
                if(AppointUserIds.indexOf(userId)==-1){
                    let userIds = AppointUserIds.split(',');
                    userIds.push(userId);
                    const newUserIds = userIds.filter(item=>{
                        return item!=""
                    })
                    await userModel.updateTicketAppointById([response.data.Num+1,newUserIds.join(','),touristSpotId]).then(res=>{

                    })
                } else {
                    response.flag = false;
                    response.msg='已经预约过了~'
                }
            }
        } else {
            // todo
            response.flag = true;
            response.msg = '模拟购买成功'
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

// 旅游景点购买门票登记个人信息
router.post('/touristSpot/checkin', async(ctx, next) => {
    const params = ctx.request.body
    const userId = ctx.session.id
    const name  = params.name
    const ticketId = params.ticketId
    const idCardNumber  = params.idCardNumber
    const cellPhone = params.cellPhone
    let response = {
        flag: false,
        data: null,
        msg: "购买失败"
    }
    if(name&&idCardNumber&&cellPhone&&ticketId){
        await userModel.findTouristSpotTicketById(ticketId).then(res=>{
            if(res.length!=1){
                response.flag = false
            } else {
                if(res[0].Num==0){
                    response.flag = false
                    response.msg = "票数已卖完"
                }else{
                    response.flag = true
                    response.data= res[0]
                }
            }
        }).catch(error=>{
            response.flag = false;
            response.msg = '购买失败,错误原因：'+error
        })
        if(response.flag){
            // 登记过，不能再登记了  ticketId userId
            await userModel.findTouristSpotTicketOrderCount(userId,ticketId).then(res=>{
                if(res[0].count==1){
                    response.flag = false
                    response.msg = '已经登记过了，无需继续登记'
                }
            })
            // 登记个人信息、并且票数减一
            if(response.flag){
                await userModel.insertTouristSpotTicketOrder([ticketId,name,idCardNumber,cellPhone,userId]).then(res=>{
                    response.flag = true
                    response.msg = '购买成功'
                })
            }
            if(response.flag){
                await userModel.updateSpotTicketNumberById(ticketId).then(res=>{
                    response.flag = true
                    response.msg = '购买成功'
                })
            }
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})


module.exports = router