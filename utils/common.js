var md5 = require('md5')
const jwt = require("jsonwebtoken");
const secret = require('../constant/index.js').secret
export function getEncodePassword(password) {
    return md5(password+secret);
}

export function generateToken(userInfo) {
    const token = jwt.sign(userInfo, secret, { expiresIn:  '2h' });
    return token;
}
