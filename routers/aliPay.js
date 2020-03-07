const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
import {alipay} from '../utils/common'
import {accMul} from '../utils/num';
router.post('/order/alipay', async(ctx, next) => {
    const params=ctx.request.body
    let result = {
        url:'',
        flag:false,
        msg:'支付失败'
    }
    const userId=ctx.session.id;
    let addressId=-1;
    // 查询是否已经存在默认地址
    await userModel.selectUserDefaultAddress(userId).then(res=>{
        if(res.length==1){
            addressId=res[0].Id
        }else{
            result.msg = "请将收货地址设为默认！！"
        }
    }).catch((res)=>{
        console.log(res)
    })
    if(addressId!=-1){
        const ids=params.ids;
        const shopcart=JSON.parse(params.shopcart);
        let sum=0;
        let goodDesLog=[]
        let goodDetail=[]
        let goodName='1个物品'
        // 通过Id查询物品详情
        await userModel.findGoodsByIds(ids).then(res=>{
            const len=res.length
            goodName=(len==1?res[0].Name:len+'个物品');
            for(let i=0,j=len;i<j;i++){
                const obj=res[i]
                for(let j=0,q=shopcart.length;j<q;j++){
                    const ss=shopcart[j]
                    if(obj.Id==ss.Id){
                        const total=accMul(obj.Price,ss.Quantity)
                        sum+=total
                        const goodDes=['物品名称:',obj.Name,',价格:',obj.Price,',数量:',ss.Quantity,',总价:',total].join('')
                        goodDesLog.push(goodDes)
                        goodDetail.push({
                            Name:obj.Name,
                            Price:obj.Price,
                            Photo:obj.Photo,
                            Quantity:ss.Quantity
                        })
                        break;
                    }
                }
            }
        }).catch()
        // 支付宝支付
        const len=goodDesLog.length
        if(sum!=0&&len!=0){
            sum = Math.floor(sum * 100) / 100
            result.url = await alipay(sum,goodName, goodDesLog.join('&&'))
            ctx.session.goodDetail = goodDetail
            ctx.session.shopcart=shopcart
            result.flag=true
        }
    }
    ctx.body = result;
})
router.get('/order/callback', async(ctx, next) => {
    const body=ctx.request.query;
    const UserId=ctx.session.id;
    const shopcart=ctx.session.shopcart;
    const Seller_Id=body.seller_id
    const Out_Trade_No=body.out_trade_no
    const Trade_No=body.trade_no
    const Total_Amount=body.total_amount
    const detail = ctx.session.goodDetail;
    let result={
        flag: false,
        msg: '支付失败'
    };
    let addressInfo=null;
    // 查询是否已经存在默认地址
    await userModel.selectUserDefaultAddress(UserId).then(res=>{
        if(res.length==1){
            addressInfo=res[0]
        }
    }).catch((res)=>{
        console.log(res)
    })
    if(addressInfo!=null){
        let data=[]
        const len=shopcart.length
        if(len==1){
            data='('+[UserId,parseInt(shopcart[0].Id),"'"+addressInfo.Name+"'","'"+addressInfo.Phone+"'","'"+addressInfo.Address+"'","'"+detail[0].Name+"'","'"+detail[0].Photo+"'","'"+detail[0].Price+"'","'"+detail[0].Quantity+"'","'"+Seller_Id+"'","'"+Out_Trade_No+"'","'"+Trade_No+"'",Total_Amount].join(',')+')'
            // 数量减少
            await userModel.updateGoodsNumById('Num-'+shopcart[0].Quantity,parseInt(shopcart[0].Id)).then(res=>{
                if(res.affectedRows==1){
                    result.flag=true
                    result.msg = '商品数量减少成功'
                }
            }).catch()
        }else{
            for(let i=0,j=len;i<j;i++){
                const obj=shopcart[i]
                const item='('+[UserId,parseInt(obj.Id),"'"+addressInfo.Name+"'","'"+addressInfo.Phone+"'","'"+addressInfo.Address+"'","'"+detail[i].Name+"'","'"+detail[i].Photo+"'","'"+detail[i].Price+"'","'"+detail[i].Quantity+"'","'"+Seller_Id+"'","'"+Out_Trade_No+"'","'"+Trade_No+"'",Total_Amount].join(',')+')'
                data.push(item)
                // 数量减少
                await userModel.updateGoodsNumById('Num-'+obj.Quantity,parseInt(obj.Id)).then(res=>{
                    result.flag=true
                    result.msg = '商品数量减少成功'
                }).catch()
            }
            data=data.join(',')
        }
        // 记录支付的结果
        await userModel.insertGoodsOrder([data]).then(res=>{
            if(res.affectedRows==len){
                result.flag=true
                result.msg = '支付记录成功'
            } else {
                result.flag = false
                result.msg = '支付记录插入不完全'
            }
        }).catch(()=>{
            result.flag = false
            result.msg = '支付记录插入失败'
        })
    }
    await ctx.render('common/alipayResult',{
        result:result
    })
})

module.exports = router