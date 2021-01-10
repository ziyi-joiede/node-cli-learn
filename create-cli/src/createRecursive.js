const fs = require('fs');

const createRecursive = (path, subFolder) => {
    fs.mkdir(`${path}`, err => {
        Object.keys(subFolder).forEach(folder => {
            fs.mkdir(`${path}/${folder}`, err => {
                subPaths[folder].forEach(file => {
                    fs.writeFile(`${path}/${folder}/${file}`, '', err => {
                        console.log(err);
                    })
                })
            })
        })
    })
}

module.exports = {
    createRecursive
}