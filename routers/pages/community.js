var router = require('koa-router')();
import {commonJson,diGuiComment} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
router.get('/communityPage', async(ctx, next) => {
    let result = commonJson(ctx)
    let communityList = []
    // 查询所有记录
    await userModel.query('select c.*,u.Username from community c left join users u on u.Id = c.UserId order by CreateTime desc').then(res=>{
        communityList = res;
    })
    // 处理数据
    result.communityList = diGuiComment(communityList,0)
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
    await userModel.insertCommunity([userId,params.Content]).then(res=>{
        let userInfo = Object.assign({},ctx.session)
        userInfo.insertId = res.insertId
        response.data = userInfo;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
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
        await userModel.updateCommunity([ctx.session.id,params.Content,params.Id]).then(res=>{
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
// 社区服务前端----------------------
router.post('/community/praise/:id', async(ctx, next) => {
    const id=ctx.params.id
    const userId = ctx.session.id
    let response = {
        flag: true,
        data: {},
        msg: '点赞成功'
    }
    await userModel.findCommunityById(id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }else{
            response.data = res[0]
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '点赞失败,错误原因：'+error
    })
    if(response.flag){
        if(response.data.UserId == userId){
            response.flag = false;
            response.msg='自己不能给自己点赞'
        }else{
            let PraiseUserIds = response.data.PraiseUserIds||"";
            if(PraiseUserIds.indexOf(userId)==-1){
                let userIds = PraiseUserIds.split(',');
                userIds.push(userId);
                await userModel.updateCommunityPraiseById([response.data.PraiseNum+1,userIds.join(','),id]).then(res=>{

                })
            } else {
                response.flag = false;
                response.msg='已经点赞过了~'
            }
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

// 回复
router.post('/community/reply/:id', async(ctx, next) => {
    const id=ctx.params.id
    const userId = ctx.session.id
    const params = ctx.request.body
    // const parentId = params.parentId
    let response = {
        flag: true,
        data: {},
        msg: '回复成功'
    }
    await userModel.findCommunityById(id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }else{
            response.data = res[0]
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '回复失败,错误原因：'+error
    })
    if(response.flag){
        if(parseInt(params.parentId||2)==0){
            // 可以评论
            await userModel.insertCommunityItem([userId,params.Content,id]).then(res=>{
                let userInfo = Object.assign({},ctx.session)
                userInfo.insertId = res.insertId
                response.data = userInfo;
            }).catch(error=>{
                response.flag = false;
                response.msg = '回复失败,错误原因：'+error
            })
        } else{
            response.flag = false;
            response.msg = '不支持二级评论'
        }
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
module.exports = router