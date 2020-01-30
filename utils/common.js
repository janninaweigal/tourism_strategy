const secret = require('../constant/index.js').secret
const footers = require('../json/footers');
const md5 = require('md5')
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign(userInfo, secret, { expiresIn:  '3h' });
    return token;
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
        },
        {
            name:'我的',
            active:false,
            router:'/personalPage'
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