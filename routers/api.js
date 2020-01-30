const router = require('koa-router')();
router.get('/api', async(ctx, next)=>{
    await ctx.render('api')
})
module.exports = router;