var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
import {commonJson} from '../../utils/common';
import { writePhotoFile,getFileName} from '../../utils/common'
router.get('/goodsPage', async(ctx, next) => {
    const result = commonJson(ctx)
    await ctx.render('pages/goods',result)
})

router.post('/goods/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getGoodsLength(searchData.globalName,searchData.isAdmin).then(res=>{
        response.total = res[0].count
    })
    await userModel.getGoodsList(searchData).then(res=>{
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
    const Status=params.Status
    const Num=params.Num
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    if(response.flag && Photo){
        // 上传图片
        let fileName =getFileName();
        const uploadFlag = await writePhotoFile(params.file,fileName)
        if(uploadFlag){
            Photo = fileName
        }else {
            response.flag = false;
        }
    } else {
        Photo = 'images/default.png'
    }
    if(response.flag){
        await userModel.insertGoods([Name,Photo,Type,Price,Status,Num]).then(res=>{
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
        if(oldData!=null&&(oldData.Photo!=Photo)){
            // 上传图片
            const fileName =getFileName();
            const uploadFlag = await writePhotoFile(params.file,fileName)
            if(uploadFlag){
                Photo = fileName
            }else {
                response.flag = false;
            }
        }
    }
    if(response.flag){
        await userModel.updateGoods([Name,Photo,Type,Price,Status,Num,Id]).then(res=>{
            response.data = res
        }).catch(()=>{
            response.flag = false;
            response.msg = '编辑失败'
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