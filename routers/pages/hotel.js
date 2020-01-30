var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/hotelPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/hotel',result)
})

module.exports = router