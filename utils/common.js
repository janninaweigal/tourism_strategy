const secret = require('../constant/index.js').secret
const footers = require('../json/footers');
const md5 = require('md5')
const jwt = require("jsonwebtoken");
const fs = require('fs');
const moment=require('moment')
/**
 * 加密密码
 * @param {*} password 
 */
export function getEncodePassword(password) {
    return md5(password+secret);
}
/**
 * 获取token
 * @param {*} userInfo 
 */
export function generateToken(userInfo) {
    const token = jwt.sign(userInfo, secret, { expiresIn:  '24h' });
    return token;
}
/**
 * 上传图片
 * @param {*} 图片链接 
 * @param {*} 是否 
 */
export async function writePhotoFile(BookPhoto,Name) {
    let dataBuffer = photoToBase64(BookPhoto);
    let upload = await new Promise((reslove,reject)=>{
        fs.writeFile('./public/' + Name, dataBuffer, err => { 
            if (err) {
                reject(false)
                throw err;
            };
            reslove(true)
        });            
    })
    return upload;
}

export function photoToBase64(BookPhoto){
    let base64Data = BookPhoto.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    return dataBuffer;
}
/**
 * 得到文件名
 */
export function getFileName(){
    const fileName=(moment().format('YYYYMMDD-HHmmss')).toString() + '-' +1000*(Math.random().toFixed(2))
    return ['images/',fileName,'.png'].join('');
}
/**
 * 格式时间
 * @param {*} format 
 */
export function formatTime(time,format){
    return moment(time).format(format)
}
/**
 * 切换导航
 * @param {*} name 
 */
export function switchNav(router) {
    let navArray = [
        {
            name:'旅行必备',
            active:false,
            router:'/goodsPage'
        },
        {
            name:'攻略信息',
            active:false,
            router:'/strategyPage'
        },
        {
            name:'旅游景点',
            active:false,
            router:'/touristSpotPage'
        },
        {
            name:'订酒店',
            active:false,
            router:'/hotelPage'
        },
        {
            name:'社区服务',
            active:false,
            router:'/communityPage'
        }
    ]
    // 如果router有值，则修改成激活
    if(router){
        for(const index in navArray){
            if(navArray[index].router==router){
                navArray[index].active=true;
                break;
            }
        }
    }
    return navArray;
}

export function commonJson(ctx){
    return {
        session: ctx.session,
        navArray: switchNav(ctx.path),
        tabList: [],
        footers:footers,
    }
}