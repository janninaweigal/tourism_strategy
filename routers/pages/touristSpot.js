var router = require('koa-router')();
import {commonJson} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
router.get('/touristSpotPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/touristSpots',result)
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

module.exports = router