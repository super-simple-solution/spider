const fs = require('fs')
function writeFile(name, pageIndex, list) {
  const basePath = `./data/${name}`
  if (fs.existsSync(basePath)) {
        console.log('该路径已存在');
    } else{
      fs.mkdirSync(basePath)
    }

  fs.writeFile(`${basePath}/${pageIndex}.js`, JSON.stringify(list), err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports = { writeFile }