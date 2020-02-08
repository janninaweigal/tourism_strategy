const jwt = require('jsonwebtoken');
import {secret} from '../constant/index.js'
import {success,error} from './sendHandle.js'
const handler = async (ctx, next) => {
  // 统一结果集
  ctx.success = success(ctx);
  ctx.error = error(ctx);
  // 处理头信息
  if (ctx.header && ctx.header.Authorization) {
    const parts = ctx.header.Authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, secret, {
            complete: true
          });
        } catch (error) {
          ctx.error('请求失败，Authorization header token 不对')
        }
      }
    }
  }
  
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.error('登录过期，请重新登录')
    }else {
      ctx.error(err.message)
    }});
  };
  module.exports = handler;