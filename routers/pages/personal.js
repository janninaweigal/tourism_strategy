var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/personalPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/personal',result)
})

module.exports = router