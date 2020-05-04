var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
router.post('/touristSpotTicket/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getTouristSpotTicketLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getTouristSpotTicketList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/touristSpotTicket/insert', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加景点门票
    await userModel.insertTouristSpotTicket([params.touristSpotId,params.type,params.num,params.price,params.status,params.appointTime]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/touristSpotTicket', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findTouristSpotTicketById(id).then(res=>{
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
// 查询预约人数
router.get('/touristSpotTicket/appointUsers', async(ctx, next) => {
    const ids=ctx.request.query.userIds
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    if(ids){
        await userModel.query("select Id,Username,Avatar,Email,IsAdmin from users where Id in ("+ids+")").then(res=>{
            response.data = res
        }).catch(error=>{
            response.flag = false;
            response.msg = '查询失败,错误原因：'+error
        })
    } else{
        response.flag = false;
        response.msg = "暂无预约"
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/touristSpotTicket/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findTouristSpotTicketById(params.id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateTouristSpotTicket([params.touristSpotId,params.type,params.num,params.price,params.status,params.appointTime,params.id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/touristSpotTicket/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteTouristSpotTicket(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router