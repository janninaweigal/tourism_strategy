var router = require('koa-router')();
var userModel = require('../../lib/mysql.js')
const result = require('../../json/result');
import {formatTime,commonJson} from '../../utils/common';
router.get('/trainsPage', async(ctx, next) => {
    let result = commonJson(ctx)
    const query=ctx.request.query
    const pageNo = parseInt(query.pageNo||1)
    result.trains = {
        list: [],
        count: 0,
        name:'trainsPage',
        pageNo:pageNo,
        pageSize:8
    }
    await userModel.query("select count(1) count from train_tickets order by CreateTime").then(res=>{
        result.trains.count = res[0].count
    })
    await userModel.query(`select * from train_tickets limit ${(result.trains.pageNo-1)*result.trains.pageSize},${result.trains.pageSize}`).then(res=>{
        result.trains.list = res
    })
    await ctx.render('pages/trains',result)
})

// 火车票详情
router.get('/trainsDetailPage',async(ctx,next)=>{
    const Id=ctx.request.query.id
    let result = commonJson(ctx)
    result.trainsDetail = {}
    result.comments = []
    if(Id){
        await userModel.findTrainById(Id).then(res=>{
            result.trainsDetail=res[0];
        })
        await userModel.getTrainStationByTicketId(Id).then(res=>{
            result.OverStations = res
        })
        await userModel.getTrainSeatByTicketId(Id).then(res=>{
            result.Seats = res
        })
        await userModel.selectCommentByTrainId(Id).then(res=>{
            result.comments=res
        })
    }
    result.session.type = 4
    await ctx.render('pages/trainsDetail',result)
})

router.post('/train/list', async(ctx, next) => {
    const response = Object.assign({},result)
    const searchData = ctx.request.body
    await userModel.getTrainLength(searchData.globalName).then(res=>{
        response.total = res[0].count
    })
    await userModel.getTrainList(searchData).then(res=>{
        response.list = res
    })
    ctx.success(response,'查询成功')
})

router.post('/train/insert', async(ctx, next) => {
    const params = ctx.request.body
    const seatType = ['硬座','硬卧','软卧','高级软卧']
    let seatDes = ['<h4 style="text-align:center;color:red;">座位   -  价格   -  数量 </h4>']
    let stopOverDes = params.OverStations.length==0?[]:['<h4 style="text-align:center;color:red;">地点   -  到达时间   -  发车时间</h4>']
    let ticketId = null;
    let seats = []
    let stopOverStations = []
    let response = {
        flag: true,
        data: null,
        msg: '添加成功'
    }
    // 处理列车座位
    params.Seats.forEach((item, i)=>{
        seatDes.push("("+(i+1)+")座位："+seatType[item.Type])
        seatDes.push("、价格："+item.Price)
        seatDes.push("、数量："+item.Quantity+"<br/>")
    })
    // 处理经停站
    params.OverStations.forEach((item, i)=>{
        stopOverDes.push("("+(i+1)+") 地点："+item.place)
        stopOverDes.push("、到达时间："+formatTime(item.timeRange[0],'YYYY年MM月DD日HH:mm:ss')+"、发车时间："+ formatTime(item.timeRange[1],'YYYY年MM月DD日HH:mm:ss')+"<br/>");
    })
    // 添加tickets
    await userModel.insertTrain([params.TrainCode,params.Type,params.StartPlace,params.EndPlace,formatTime(params.ArriveTime,'YYYY-MM-DD HH:mm:ss'),formatTime(params.DepartTime,'YYYY-MM-DD HH:mm:ss'),seatDes.join(''),stopOverDes.join('')]).then(res=>{
        ticketId = res.insertId
        response.data = res;
    }).catch(error=>{
        response.flag = false;
        response.msg = '添加失败,错误原因：'+error
    })
    // 添加座位
    if(response.flag){
        // 添加ticketId
        params.Seats.forEach((item, i)=>{
            if(i!=0){
                seats.push(',')
            }
            seats.push(`(${ticketId},${item.Type},'${item.Price}',${item.Quantity})`)
        })
        await userModel.insertBatchTrainSeat(seats).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '添加失败,错误原因：'+error
        })
    }
    // 添加经停站
    if(response.flag&&params.OverStations.length!=0){
        // 添加ticketId
        params.OverStations.forEach((item, i)=>{
            if(i!=0){
                stopOverStations.push(',')
            }
            stopOverStations.push(`(${ticketId},'${item.place}','${formatTime(item.timeRange[0],'YYYY-MM-DD HH:mm:ss')}','${formatTime(item.timeRange[1],'YYYY-MM-DD HH:mm:ss')}',${i+1})`)
        })
        await userModel.insertBatchTrainStation(stopOverStations).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '添加失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})

router.put('/train/update', async(ctx, next) => {
    const params = ctx.request.body
    const seatType = ['硬座','硬卧','软卧','高级软卧']
    let seatDes = ['<h4 style="text-align:center;color:red;">座位   -  价格   -  数量 </h4>']
    let stopOverDes = params.OverStations.length==0?[]:['<h4 style="text-align:center;color:red;">地点   -  到达时间   -  发车时间</h4>']
    let ticketId = params.Id;
    let seats = []
    let stopOverStations = []
    let response = {
        flag: true,
        data: null,
        msg: '编辑成功'
    }
    await userModel.findTrainById(ticketId).then(res=>{
        if(res.length!=1){
            response.flag = false
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '编辑失败,错误原因：'+error
    })
    if(response.flag){
        // 处理列车座位
        params.Seats.forEach((item, i)=>{
            seatDes.push("("+(i+1)+") 座位："+seatType[item.Type])
            seatDes.push("、价格："+item.Price)
            seatDes.push("、数量："+item.Quantity+"<br/>")
            if(i!=0){
                seats.push(',')
            }
            seats.push(`(${ticketId},${item.Type},'${item.Price}',${item.Quantity})`)
        })
        // 处理经停站
        params.OverStations.forEach((item, i)=>{
            stopOverDes.push("("+(i+1)+") 地点："+item.place)
            stopOverDes.push("、到达时间："+formatTime(item.timeRange[0],'YYYY年MM月DD日HH:mm:ss')+"、发车时间："+ formatTime(item.timeRange[1],'YYYY年MM月DD日HH:mm:ss')+"<br/>");
            if(i!=0){
                stopOverStations.push(',')
            }
            stopOverStations.push(`(${ticketId},'${item.place}','${formatTime(item.timeRange[0],'YYYY-MM-DD HH:mm:ss')}','${formatTime(item.timeRange[1],'YYYY-MM-DD HH:mm:ss')}',${i+1})`)
        })
    }
    // 先删除，后添加
    if(response.flag){
        await userModel.deleteTrainStationByTicketId(ticketId).then(()=>{}).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
        await userModel.deleteTrainSeatByTicketId(ticketId).then(()=>{}).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    // 更新tickets
    if(response.flag){
        await userModel.updateTrain([params.StartPlace,params.EndPlace,formatTime(params.ArriveTime,'YYYY-MM-DD HH:mm:ss'),formatTime(params.DepartTime,'YYYY-MM-DD HH:mm:ss'),seatDes.join(''),stopOverDes.join(''),ticketId]).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    // 添加座位
    if(response.flag){
        await userModel.insertBatchTrainSeat(seats).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    // 添加经停站
    if(response.flag&&params.OverStations.length!=0){
        await userModel.insertBatchTrainStation(stopOverStations).then(res=>{
            response.data = res;
        }).catch(error=>{
            response.flag = false;
            response.msg = '编辑失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.get('/train', async(ctx, next) => {
    const id=ctx.query.id
    let response = {
        flag: true,
        data: null,
        msg: '查找成功'
    }
    await userModel.findTrainById(id).then(res=>{
        if(res.length==1){
            response.data = res[0]
        } else {
            response.flag = false;
        }
    }).catch(error=>{
        response.flag = false;
        response.msg = '查找失败,错误原因：'+error
    })
    if(response.data!=null){
        await userModel.getTrainStationByTicketId(id).then(res=>{
            let OverStations=[]
            for(const item of res){
                OverStations.push({
                    place: item.Place,
                    timeRange: [item.ArriveTime,item.DepartTime]
                })
            }
            response.data.OverStations = OverStations
        }).catch(error=>{
            response.flag = false;
            response.msg = '查找失败,错误原因：'+error
        })
        await userModel.getTrainSeatByTicketId(id).then(res=>{
            response.data.Seats = res
        }).catch(error=>{
            response.flag = false;
            response.msg = '查找失败,错误原因：'+error
        })
    }
    response.flag?ctx.success(response.data,response.msg):ctx.error(response.msg)
})
router.delete('/train/delete/:id', async(ctx, next) => {
    const id=ctx.params.id
    let flag = false;
    if(id){
        await userModel.deleteTrain(id).then(res=>{
            flag = true
        })
        await userModel.deleteTrainStationByTicketId(id).then(res=>{
            flag = true
        })
        await userModel.deleteTrainSeatByTicketId(id).then(res=>{
            flag = true
        })
    }
    flag?ctx.success(null,'删除成功'):ctx.error('删除失败');
})
module.exports = router