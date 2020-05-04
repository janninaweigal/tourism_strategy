var router = require('koa-router')();
import {commonJson} from '../../utils/common';
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');

router.get('/hotelPage', async(ctx, next) => {
    const result = commonJson(ctx)
    const query=ctx.request.query
    const pageNo = parseInt(query.pageNo||1)
    result.hotel = {
        list: [],
        count: 0,
        name:'hotelPage',
        pageNo:pageNo,
        pageSize:10
    }
    await userModel.query("select count(1) count from hotels").then(res=>{
        result.hotel.count = res[0].count
    })
    await userModel.query(`select h.*,min(Price) MinPrice from hotels h left join hotel_room r on r.HotelId = h.Id GROUP BY h.Id limit ${(result.hotel.pageNo-1)*result.hotel.pageSize},${result.hotel.pageSize}`).then(res=>{
        result.hotel.list = res.map(item=>{
            item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
        　　return item
        })
    })
    await ctx.render('pages/hotel',result)
})
// 酒店详情
router.get('/hotelDetailPage', async(ctx, next) => {
    const Id=ctx.request.query.id
    let result = commonJson(ctx)
    result.hotelDetail = {}
    result.comments = []
    if(Id){
        await userModel.findHotelById(Id).then(res=>{
            let data = res[0]
            data.Pictures = data.Pictures?JSON.parse(data.Pictures).pictures:{"pictures":[]}
            result.hotelDetail=res[0];
        })
        await userModel.query(`select * from hotel_room where HotelId = ${Id}`).then(res=>{
            result.hotelRoomDetail=res.map(item=>{
                item.Pictures = item.Pictures?JSON.parse(item.Pictures).pictures:{"pictures":[]}
            　　return item
            });
        })
        await userModel.selectCommentByHotelId(Id).then(res=>{
            result.comments=res
        })
    }
    result.session.type = 3
    await ctx.render('pages/hotelDetail',result)
})

router.post('/hotel/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getHotelLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getHotelList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/hotel/insert', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 添加攻略信息
    await userModel.insertHotel([params.Name,params.Pictures,params.Detail,params.Address,params.HasBreakfast,params.HasWifi]).then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/hotels', async(ctx, next) => {
    let response = {
        flag: true,
        data: [],
        msg: '查询成功'
    }
    await userModel.getAllHotelList().then(res=>{
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '查询失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.get('/hotel', async(ctx, next) => {
    const id=ctx.request.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查询成功'
    }
    await userModel.findHotelById(id).then(res=>{
        if(res.length==1){
            response.data = res[0];
        }else{
            response.flag = false;
            response.msg = '查询失败'
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '查询失败,错误原因：'+error
    })
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/hotel/update', async(ctx, next) => {
    const params = ctx.request.body
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findHotelById(params.Id).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        await userModel.updateHotel([params.Name,params.Pictures,params.Detail,params.Address,params.HasBreakfast,params.HasWifi,params.Id]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/hotel/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteHotel(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router