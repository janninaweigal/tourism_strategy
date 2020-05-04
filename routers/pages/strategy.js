var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
import {commonJson} from '../../utils/common';
router.get('/strategyPage', async(ctx, next) => {
    const result = commonJson(ctx)
    const query=ctx.request.query
    const pageNo = parseInt(query.pageNo||1)
    result.strategy = {
        list: [],
        count: 0,
        name:'strategyPage',
        pageNo:pageNo,
        pageSize:10
    }
    await userModel.query("select count(1) count from strategy_info").then(res=>{
        result.strategy.count = res[0].count
    })
    await userModel.query(`select * from strategy_info limit ${(result.strategy.pageNo-1)*result.strategy.pageSize},${result.strategy.pageSize}`).then(res=>{
        result.strategy.list = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    })
    await ctx.render('pages/strategy',result)
})

// 攻略信息详情
router.get('/strategyDetailPage',async(ctx,next)=>{
    const Id=ctx.request.query.id
    let result = commonJson(ctx)
    result.strategyDetail = {}
    result.comments = []
    if(Id){
        await userModel.findStrategyById(Id).then(res=>{
            if(res.length==1){
                let data = res[0]
                data.Pictures = data.Pictures?JSON.parse(data.Pictures).pictures:{"pictures":[]}
                result.strategyDetail=data
            }
        })
        await userModel.selectCommentByStrategyId(Id).then(res=>{
            result.comments=res
        })
    }
    result.session.type = 2
    await ctx.render('pages/strategyDetail',result)
})

router.post('/strategy/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getStrategyLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getStrategyList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/strategy/insert', async(ctx, next) => {
    const params = ctx.request.body
    const UserId=ctx.session.id;
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertStrategy([params.Title,params.Pictures,params.Content,params.Address,UserId]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/strategy', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findStrategyById(id).then(res=>{
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

router.put('/strategy/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findStrategyById(params.Id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateStrategy([params.Title,params.Pictures,params.Content,params.Address,params.Id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/strategy/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteStrategy(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})

// 酒店房间登记个人信息
router.post('/strategy/checkin', async(ctx, next) => {
    const params = ctx.request.body
    const userId = ctx.session.id
    const name  = params.name
    const roomId = params.roomId
    const idCardNumber  = params.idCardNumber
    const cellPhone = params.cellPhone
    let response = {
        flag: false,
        data: null,
        msg: "购买失败"
    }
    if(name&&idCardNumber&&cellPhone&&roomId){
        await userModel.findRoomById(roomId).then(res=>{
            if(res.length!=1){
                response.flag = false
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