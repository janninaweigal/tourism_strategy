const router = require('koa-router')();
router.get('/home', async(ctx, next)=>{
    await ctx.render('home')
})
module.exports = router;