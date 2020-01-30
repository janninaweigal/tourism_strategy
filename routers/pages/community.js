var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/communityPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/community',result)
})

module.exports = router