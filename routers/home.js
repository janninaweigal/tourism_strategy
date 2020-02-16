const router = require('koa-router')();
const userModel = require('../lib/mysql');
import {commonJson} from '../utils/common';
import {uploadSingleImg} from '../utils/upload';

router.get('/', async(ctx, next)=>{
    let images = [];
    // 轮播图
    await userModel.findAllCarousel().then(result=>{
        if(result){
            images=result
        }
    })
    let result = commonJson(ctx);
    result.images = images
    result.goodsList = []
    await userModel.query(`select * from goods where Status!=3 limit 0,4`).then(res=>{
        result.goodsList = res
    })
    result.strategyList = []
    await userModel.query(`select * from strategy_info limit 0,8`).then(res=>{
        result.strategyList = res.map(item=>{
            item.Pictures = JSON.parse(item.Pictures).pictures
        　　return item
        })
    })
    // 暂时写死
    result.tabList=[
        {
            id:1,
            name:"畅游资讯",
            list: [
                {
                    Id:2,
                    Name:'贺记蛋烘糕',
                    Url: 'strategyDetailPage'
                },
                {
                    Id:3,
                    Name:'带1岁萌娃关西赏樱，丢了爸爸摔了手机还差点露宿街头',
                    Url: 'strategyDetailPage'
                },
                {
                    Id:5,
                    Name:'梅里雪山69天义工旅居 这是属于我的梅里往事',
                    Url: 'strategyDetailPage'
                },
                {
                    Id:4,
                    Name:'神秘复活节岛，世界尽头巴塔哥尼亚，来智利实现车厘子自由',
                    Url: 'strategyDetailPage'
                },
                {
                    Id:2,
                    Name:'三坊七巷',
                    Url: 'touristSpotsDetailPage'
                }
            ]
        }
    ]
    await ctx.render('home',result)
})
 router.post('/uploadImg', async (ctx) => {
    let files = await uploadSingleImg(ctx.request)
    ctx.success(files,'上传图片成功')
 })
 router.post('/upladAvatar', async (ctx) => {
    let files = await uploadSingleImg(ctx.request)
    // 修改用户头像
    let flag = false
    await userModel.upladAvatarById([files.name,ctx.session.id]).then(result=>{
        flag = true
    })
    flag?ctx.success(files,'修改头像成功'):ctx.error('修改头像失败')
 })
 
// 更换密码
router.get('/changePwdPage', async(ctx, next) => {
    await ctx.render('pages/changePwd',commonJson(ctx))
})
// 目的地搜索
router.get('/searchPage', async(ctx, next) => {
    const searchName = ctx.query.searchName
    let result = commonJson(ctx)
    result.touristSpot = []
    result.strategy = []
    result.touristSpot = []
    if(searchName){
        // 旅游景点
        await userModel.query(`select * from tourist_spots where Name = '${searchName}' limit 0,9`).then(res=>{
            result.touristSpot = res.map(item=>{
                item.Pictures = JSON.parse(item.Pictures).pictures
            　　return item
            })
        })
        // 攻略信息
        await userModel.query(`select * from strategy_info where Address like '%${searchName}%' limit 0,9`).then(res=>{
            result.strategy = res.map(item=>{
                item.Pictures = JSON.parse(item.Pictures).pictures
            　　return item
            })
        })
        // 火车票
        await userModel.query(`select * from train_tickets where StartPlace = '${searchName}' or EndPlace = '${searchName}' limit 0,9`).then(res=>{
            result.trains = res
        })
    }
    result.searchName = searchName
    await ctx.render('pages/search',result)
})
module.exports = router;