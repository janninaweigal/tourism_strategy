var router = require('koa-router')();
var userModel = require('../lib/mysql.js')
const result = require('../json/result');
import { writePhotoFile,getFileName} from '../utils/common'

router.post('/user/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.selectUserInfoLength(searchData.globalName,searchData.isAdmin).then(res=>{
        response.total = res[0].count
    })
    await userModel.selectUserInfo(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/user/insert', async(ctx, next) => {
    const params = ctx.request.body
    const email=params.email
    const username=params.username
    let fileName =''
    let avatar=params.avatar
    const isAdmin=params.isAdmin?1:0
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    await userModel.findUserByName([username]).then(res=>{
        if(res.length>0){
            response = {
                flag: false,
                msg: '已存在'+username+'用户！'
            }
        } 
    })
    if(response.flag && avatar){
        // 上传图片
        fileName =getFileName();
        const uploadFlag = await writePhotoFile(avatar,fileName)
        response.flag = uploadFlag
    } else {
        fileName = 'images/default.png'
    }
    if(response.flag){
        await userModel.insertUserInfo([username,fileName,email,isAdmin]).then(res=>{
            response.data = res;
        }).catch(()=>{
            response.flag = false;
            response.msg = '添加失败'
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.put('/user/update', async(ctx, next) => {
    const params = ctx.request.body
    const id=params.id;
    const email=params.email
    const username=params.username
    let avatar=params.avatar
    const isAdmin=params.isAdmin?1:0
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    let oldData = null
    await userModel.findUserById(id).then(res=>{
        if(res.length>0){
            oldData = res[0]
        }else {
            response = {
                flag: false,
                msg: '请正确传值id！'
            }
        }
    })
    if(!oldData){
        await userModel.findUserByName([username]).then(res=>{
            if(res.length>0){
                const data = res[0]
                if(data.Id != id) {
                    response = {
                        flag: false,
                        msg: '已存在'+username+'用户！'
                    }
                }
            } 
        })
    }
    if(response.flag && avatar){
        if(avatar.indexOf(oldData.Avatar)==-1){
            // 上传图片
            let fileName =getFileName();
            const uploadFlag = await writePhotoFile(avatar,fileName)
            if(uploadFlag){
                avatar = fileName
            }else {
                response.flag = false;
            }
        }
        avatar = avatar.slice(avatar.indexOf('images'))
    }
    if(response.flag){
        await userModel.updateUser([username,email,isAdmin,avatar,id]).then(res=>{
            response.data = res
        }).catch(()=>{
            response.flag = false;
            response.msg = '编辑失败'
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/user/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteUserInfo(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})

// 更新头像
router.put('/personal/updateImg', async(ctx,next)=>{
    let result={
        flag:false,
        msg:'个人信息更新失败'
    }
    const Photo=ctx.request.body.avatar;
    let upload = false;
    const id=ctx.session.id
    const avatar =ctx.session.avatar
    if(Photo!=avatar){
        // 上传头像
        let fileName =getFileName();
        upload =await writePhotoFile(Photo,fileName)
        if(upload){
            // 更新个人信息的头像
            await userModel.updateUserImg(fileName,id).then(res=>{
                result.flag=true;
                result.msg='个人信息更新成功'
                ctx.session.avatar = fileName;
            }).catch(err => {
                result.flag=false;
                result.msg='出现错误！！'
            })
        }
    }else{
        result.flag=true;
        result.msg='个人信息更新成功'
    }
    ctx.body=result
});
module.exports = router