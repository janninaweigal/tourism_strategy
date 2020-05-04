var router = require('koa-router')();
const userModel = require('../../lib/mysql.js')
import {commonJson} from '../../utils/common';
router.get('/personalPage', async(ctx, next) => {
    const result = commonJson(ctx)
    const UserId=ctx.session.id;
    result.orderList = []
    result.appointList = []
    // 酒店信息
    await userModel.selectHotelRoomAppointByUserId(UserId).then(res=>{
        result.appointList = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    }).catch()
    // 旅行订单
    await userModel.selectGoodsOrderByUserId(UserId).then(res=>{
        result.orderList = res
    }).catch()
    // 攻略信息 strategyList
    await userModel.selectStrategyByUserId(UserId).then(res=>{
        result.strategyList = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    }).catch()
    // 景点订单
    await userModel.selectTouristSpotByUserId(UserId).then(res=>{
        result.spotList = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    }).catch()
    await ctx.render('pages/personal',result)
})

module.exports = router