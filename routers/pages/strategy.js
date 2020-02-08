var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/strategyPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/strategy',result)
})

router.post('/strategy/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getTrainLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getTrainList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/strategy/insert', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/strategy/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/strategy/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteTrain(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router