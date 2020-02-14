var router = require('koa-router')();
import {commonJson} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
router.get('/communityPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/community',result)
})

router.post('/community/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getCommunityLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getCommunityList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/community/insert', async(ctx, next) => {
    const params = ctx.request.body
    const userId = ctx.session.id;
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertCommunity([userId,params.Content,params.PraiseNum]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/communitys', async(ctx, next) => {
    let response = {
        flag: true,
        data: [],
        msg: '查询成功'
    }
    await userModel.getAllCommunityList().then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '查询失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/community', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findCommunityById(id).then(res=>{
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

router.put('/community/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findCommunityById(params.Id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateCommunity([ctx.session.id,params.Content,params.PraiseNum,params.Id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/community/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteCommunity(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router