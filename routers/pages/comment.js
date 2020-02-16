var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')

router.post('/comment', async(ctx, next) => {
    const result={
        code: 0,
        data:[],
        msg: '评论失败'
    }
    const params=ctx.request.body
    const userId=ctx.session.id
    const type=ctx.session.type
    const id=params.id
    const comment=params.comment
    switch(type){
        // 必备物品
        case 1:
            // 先插入评论
            await userModel.insertComment([userId,id,comment]).then(res=>{
                result.code=1
                result.msg='评论成功'
            })
            if(result.code ==1){
                // 通过id查所有评论
                await userModel.selectCommentByGoodsId(id).then(res=>{
                    result.data=res
                })
            }
            break;
        // 攻略信息
        case 2:
            // 先插入评论
            await userModel.query("insert into strategy_info_comments(UserId,StrategyInfoId,Content) values(?,?,?);",[userId,id,comment]).then(res=>{
                result.code=1
                result.msg='评论成功'
            })
            if(result.code ==1){
                // 通过id查所有评论
                await userModel.selectCommentByStrategyId(id).then(res=>{
                    result.data=res
                })
            }
            break;
        // 酒店
        case 3:
            // 先插入评论
            await userModel.insertHotelComment([userId,id,comment]).then(res=>{
                result.code=1
                result.msg='评论成功'
            })
            if(result.code ==1){
                // 通过id查所有评论
                await userModel.selectCommentByHotelId(id).then(res=>{
                    result.data=res
                })
            }
            break;
        // 景点评论
        case 4:
            // 先插入评论
            await userModel.insertTouristSpotComment([userId,id,comment]).then(res=>{
                result.code=1
                result.msg='评论成功'
            })
            if(result.code ==1){
                // 通过id查所有评论
                await userModel.selectCommentByTouristSpotId(id).then(res=>{
                    result.data=res
                })
            }
            break;
    }
    ctx.body = result;
})

module.exports = router