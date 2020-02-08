const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
import {getEncodePassword,generateToken} from '../utils/common.js'

router.post('/admin/login', async(ctx, next) => {
    const username=ctx.request.body.username;
    const password=ctx.request.body.password;
    const isAdmin=ctx.request.body.isAdmin;
    if(username&&password){
        let flag = false
        await userModel.findUserByName(username).then(res=>{
            if(res.length==1){
                ctx.session.id = res[0].Id;
                ctx.session.username=res[0].Username;
                ctx.session.avatar = res[0].Avatar;
                ctx.session.email = res[0].Email;
                ctx.session.IsAdmin = res[0].IsAdmin;
                flag = true
            } else {
                ctx.error('用户名不存在！！')
            }
        }).catch(err => {
            ctx.error('出现错误！！')
        })
        if(flag){
            await userModel.selectUser([username,getEncodePassword(password),isAdmin]).then(res=>{
                if(res.length==1){
                    ctx.success({
                        token: generateToken({
                            username
                        }),
                        username,
                        avatar: res[0].Avatar,
                        createTime: res[0].CreateTime,
                        password
                    },'恭喜您！'+username+'登陆成功')
                }
                else{
                    ctx.error('用户名或密码不对！')
                }
            }).catch(err => {
                ctx.error('出现错误！！')
            })
        }
    } else {
        ctx.error('请填写好用户名和密码！')
    }
})

module.exports = router