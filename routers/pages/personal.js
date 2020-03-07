var router = require('koa-router')();
const userModel = require('../../lib/mysql.js')
import {commonJson} from '../../utils/common';
router.get('/personalPage', async(ctx, next) => {
    const result = commonJson(ctx)
    const UserId=ctx.session.id;
    result.orderList = []
    result.appointList = []
    await userModel.selectHotelRoomAppointByUserId(UserId).then(res=>{
        result.appointList = res.map(item=>{
            item.Pictures = JSON.parse(item.Pictures).pictures
        　　return item
        })
    }).catch()
    await userModel.selectGoodsOrderByUserId(UserId).then(res=>{
        result.orderList = res
    }).catch()
    await ctx.render('pages/personal',result)
})

module.exports = router