var router = require('koa-router')();
const userModel = require('../lib/mysql.js')

router.get('/statis/user/:date/count', async(ctx, next) => {
    const date = ctx.params.date
    let result = {
        count: 0
    }
    await userModel.selectCountByDate(date,0).then(res=>{
        result.count = res[0].count
    })
    ctx.body = result
})
router.get('/statis/admin/:date/count', async(ctx, next) => {
    const date = ctx.params.date
    let result = {
        count: 0
    }
    await userModel.selectCountByDate(date,1).then(res=>{
        result.count = res[0].count
    })
    ctx.body = result
})

router.get('/statis/admins/count', async(ctx, next) => {
    let result = {
        count: 0
    }
    await userModel.selectUserInfoLength('',1).then(res=>{
        result.count = res[0].count
    })
    ctx.body = result
})

router.get('/statis/users/count', async(ctx, next) => {
    let result = {
        count: 0
    }
    await userModel.selectUserInfoLength('',0).then(res=>{
        result.count = res[0].count
    })
    ctx.body = result
})
// 订单统计
router.get('/statis/orders/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})
router.get('/statis/order/:date/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})

module.exports = router