const router = require('koa-router')();
const userModel = require('../lib/mysql');
import {commonJson} from '../utils/common';
import {uploadSingleImg} from '../utils/upload';

router.get('/', async(ctx, next)=>{
    let images = [];
    // 轮播图
    await userModel.findAllCarousel().then(result=>{
        if(result){
            images=result
        }
    })
    let result = commonJson(ctx);
    result.images = images
    result.goodsList = []
    await userModel.query(`select * from goods where Status!=3 limit 0,4`).then(res=>{
        result.goodsList = res
    })
    result.strategyList = []
    await userModel.query(`select * from strategy_info limit 0,8`).then(res=>{
        result.strategyList = res.map(item=>{
            item.Pictures = JSON.parse(item.Pictures).pictures
        　　return item
        })
    })
    await ctx.render('home',result)
})
 router.post('/uploadImg', async (ctx) => {
    let files = await uploadSingleImg(ctx.request)
    ctx.success(files,'上传图片成功')
 })
 router.post('/upladAvatar', async (ctx) => {
    let files = await uploadSingleImg(ctx.request)
    // 修改用户头像
    let flag = false
    await userModel.upladAvatarById([files.name,ctx.session.id]).then(result=>{
        flag = true
    })
    flag?ctx.success(files,'修改头像成功'):ctx.error('修改头像失败')
 })
module.exports = router;