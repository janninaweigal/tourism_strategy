
const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
import {commonJson} from '../utils/common';
import {accMul} from '../utils/num';
// 跳转确认订单页面
router.get('/confirmOrderPage', async(ctx, next) => {
    let result = commonJson(ctx);
    result.addressList=[]
    const params=ctx.request.query
    const ids=params.ids;
    const shopcart=JSON.parse(params.shopcart);
    let orderList=[]
    let sum = 0
    const UserId=ctx.session.id;
    // ids 数组的商品集合
    await userModel.findGoodsByIds(ids).then(res=>{
        orderList=res
    }).catch()
    for(let i=0,j=orderList.length;i<j;i++){
        const bid=orderList[i].BookId
        for(let j=0,q=orderList.length;j<q;j++){
            let ss=shopcart[j]
            if(bid==ss.BookId){
                orderList[i].Quantity=ss.Quantity
                sum+=accMul(ss.Quantity,orderList[i].Price)
                break;
            }
        }
    }
    result.orderList = orderList
    result.sum = Math.floor(sum * 100) / 100
    // 根据id查询地址
    await userModel.selectUserAddress(UserId).then(res=>{
        result.addressList=res
    }).catch()
    await ctx.render('common/confirmOrder',result)
})

// 商品详情购买时 判断是否登录
router.post('/orderIsLogin', async (ctx) => {
    let result={
        flag:false,
        msg:'请先登录！'
    };
    const params=ctx.request.body
    const Id=params.Id;
    const Quantity=params.Quantity;
    // 判断是否登陆注册
    if(ctx.session.username){
        if(Id&&Quantity){
            if(Quantity>0)result.flag=true;
            result.msg='购买数量至少为1 '
        }else{
            result.msg='参数错误！！'
        }
    }
    ctx.body = result;
 })

module.exports = router