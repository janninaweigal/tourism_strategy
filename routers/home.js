const router = require('koa-router')();
const userModel = require('../lib/mysql');
import {commonJson} from '../utils/common';

router.get('/', async(ctx, next)=>{
    let images = [];
    // 轮播图
    await userModel.findAllCarousel().then(result=>{
        if(result){
            images=result
        }
    })
    const result = commonJson(ctx);
    result.labels = []
    result.images = images
    result.goods = []
    await ctx.render('home',result)
})
module.exports = router;