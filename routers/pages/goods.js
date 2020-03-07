var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
import {commonJson} from '../../utils/common';
import { writePhotoFile,getFileName} from '../../utils/common'
router.get('/goodsPage', async(ctx, next) => {
    let result = commonJson(ctx)
    const query=ctx.request.query
    const pageNo = parseInt(query.pageNo||1)
    result.goods = {
        list: [],
        count: 0,
        name:'goodsPage',
        pageNo:pageNo,
        pageSize:8
    }
    await userModel.query("select count(1) count from goods where Status!=3").then(res=>{
        result.goods.count = res[0].count
    })
    await userModel.query(`select * from goods where Status!=3 limit ${(result.goods.pageNo-1)*result.goods.pageSize},${result.goods.pageSize}`).then(res=>{
        result.goods.list = res
    })
    await ctx.render('pages/goods',result)
})

// 商品详情
router.get('/detailPage',async(ctx,next)=>{
    const Id=ctx.request.query.id
    let result = commonJson(ctx)
    result.goodsDetail = {}
    result.comments = []
    if(Id){
        await userModel.findGoodsById(Id).then(res=>{
            result.goodsDetail=res[0];
        })
        await userModel.selectCommentByGoodsId(Id).then(res=>{
            result.comments=res
        })
    }
    result.session.type = 1
    await ctx.render('pages/goodsDetail',result)
})

router.post('/goods/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getGoodsLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getGoodsList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/goods/order/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getGoodsOrderLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getGoodsOrderList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/goods/insert', async(ctx, next) => {
    const params = ctx.request.body
    const Name=params.Name
    const Type=params.Type
    let Photo=params.Photo
    const Price=params.Price
    let fileName = ''
    const Status=params.Status
    const Num=params.Num
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    if(response.flag && Photo){
        // 上传图片
        fileName =getFileName();
        const uploadFlag = await writePhotoFile(Photo,fileName)
        response.flag = uploadFlag
    } else {
        fileName = 'images/default.png'
    }
    if(response.flag){
        await userModel.insertGoods([Name,fileName,Type,Price,Status,Num,params.Detail]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '添加失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/goods/update', async(ctx, next) => {
    const params = ctx.request.body
    const Name=params.Name
    const Type=params.Type
    let Photo=params.Photo
    const Price=params.Price
    const Status=params.Status
    const Num=params.Num
    const Id=params.Id
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    let oldData = null
    await userModel.findGoodsById(Id).then(res=>{
        if(res.length>0){
            oldData = res[0]
        }else {
            response = {
                flag: false,
                msg: '请正确传值id！'
            }
        }
    })
    if(response.flag && Photo){
        if(Photo.indexOf(oldData.Photo)==-1){
            // 上传图片
            let fileName =getFileName();
            const uploadFlag = await writePhotoFile(Photo,fileName)
            if(uploadFlag){
                Photo = fileName
            }else {
                response.flag = false;
            }
        }
        Photo = Photo.slice(Photo.indexOf('images'))
    }
    if(response.flag){
        await userModel.updateGoods([Name,Photo,Type,Price,Status,Num,params.Detail,Id]).then(res=>{
            response.data = res
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/goods/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteGoods(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router