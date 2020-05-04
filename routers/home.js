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
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    })
    let tabList = [
        {
            id:1,
            name:"畅游资讯",
            list: []
        }
    ]
    await userModel.query("select Id,Title from strategy_info limit 0,6").then(res=>{
        res.forEach(item=>{
            tabList[0].list.push({
                Id:item.Id,
                Name:item.Title,
                Url: 'strategyDetailPage'
            })
        })
    })
    // await userModel.query("select Id,Name from tourist_spots limit 0,3").then(res=>{
    //     res.forEach(item=>{
    //         item.Url = 'touristSpotsDetailPage'
    //         tabList[0].list.push(item)
    //     })
    // })
    result.tabList=tabList
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
        await userModel.query(`select * from tourist_spots where Name like '%${searchName}%' or Address like '%${searchName}%' limit 0,3`).then(res=>{
            result.touristSpot = res.map(item=>{
                item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
            　　return item
            })
        })
        // 攻略信息
        await userModel.query(`select * from strategy_info where Title like '%${searchName}%' or Address like '%${searchName}%' limit 0,3`).then(res=>{
            result.strategy = res.map(item=>{
                item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
            　　return item
            })
        })
        // 酒店
        await userModel.query(`select h.*,min(Price) MinPrice from hotels h left join hotel_room r on r.HotelId = h.Id where h.Name like '%${searchName}%' or h.Address like '%${searchName}%' GROUP BY h.Id limit 0,3`).then(res=>{
            result.hotelList = res.map(item=>{
                item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
            　　return item
            })
        })
        // 火车票
        await userModel.query(`select * from train_tickets where EndPlace = '${searchName}' limit 0,3`).then(res=>{
            result.trains = res
        })
    }
    result.searchName = searchName
    await ctx.render('pages/search',result)
})
module.exports = router;