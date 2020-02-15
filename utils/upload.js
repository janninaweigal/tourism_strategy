var fs = require('fs')
var path = require('path')
function getFileName(fileName){
    // (file.originalname)
    var fileFormat = fileName.split(".");  //以点分割成数组，数组的最后一项就是后缀名
    return Date.now() + "." + fileFormat[fileFormat.length - 1];
}
export async function uploadSingleImg(obj){
  // 上传单个文件
  const file = obj.files.file
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const fileName = getFileName(file.name)
  let filePath = path.join(__dirname, '../public/images/') + fileName;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return {
        name:fileName,
        url:'images/'+fileName
    };
}
export async function uploadMultiImg(obj){
    // 上传多个个文件
    const files = obj.files
    const fileArray = []
    for (let key in files) {
        const fileName = getFileName(files[key].name)
      // 创建可读流
      const reader = fs.createReadStream(files[key].path);
      let filePath = path.join(__dirname, '../public/images/') + fileName;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      fileArray.push({
          name:fileName,
          url:'images/'+fileName
      })
    }
    return fileArray;
  }