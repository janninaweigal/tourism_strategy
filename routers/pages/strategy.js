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
        pageNo:pageNo
    }
    const searchData = {
        pageNo:pageNo,
        pageSize:10
    }
    await userModel.query("select count(1) count from strategy_info").then(res=>{
        result.strategy.count = res[0].count
    })
    await userModel.query(`select * from strategy_info limit ${(searchData.pageNo-1)*searchData.pageSize},${searchData.pageSize}`).then(res=>{
        result.strategy.list = res.map(item=>{
            item.Pictures = JSON.parse(item.Pictures).pictures
        　　return item
        })
    })
    result.strategyCopy = JSON.stringify(result.strategy)
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
            result.strategyDetail=res[0];
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
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertStrategy([params.Title,params.Pictures,params.Content,params.Address]).then(res=>{
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
module.exports = router