var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/goodsPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/goods',result)
})

module.exports = router