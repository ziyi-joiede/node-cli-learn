const fs = require('fs');
const path = process.cwd();

const createFile = (path, files) => {
    fs.mkdir(`${path}`, err => {
        files.forEach(file => {
            fs.writeFile(`${path}/${file}`, '', err => {
                console.log(err);
            });
        })
    })
}

module.exports = {
    createFile,
}