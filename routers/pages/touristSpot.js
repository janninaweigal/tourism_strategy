var router = require('koa-router')();
import {commonJson} from '../../utils/common';
router.get('/touristSpotPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/touristSpots',result)
})

module.exports = router