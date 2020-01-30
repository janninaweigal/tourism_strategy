var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/strategyPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/strategy',result)
})

module.exports = router