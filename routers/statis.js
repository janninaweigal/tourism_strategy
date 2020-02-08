var router = require('koa-router')();
// var userModel = require('../lib/mysql.js')

router.get('/statis/user/:date/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})
router.get('/statis/order/:date/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})
router.get('/statis/admin/:date/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})

router.get('/statis/admins/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})

router.get('/statis/orders/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})

router.get('/statis/users/count', async(ctx, next) => {
    ctx.body = {
        count: 0
    }
})

module.exports = router