#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const defaultTemplate = require(`${__dirname}/../template/template.json`);

const path = process.cwd();

let templateFileName = process.argv[process.argv.length - 1];

templateConfig = templateFileName.endsWith('.json') ?
    JSON.parse(fs.readFileSync(`${path}/${templateFileName}`).toString()) :
    defaultTemplate;



let questions = [{
    name: 'name',
    type: 'input',
    message: '请输入工程名称',
    validate(val) {
        if (val === '') {
            return '工程名称不能为空'
        }
        return true;
    }
}];

inquirer.prompt(questions).then(answer => {
    for (let key in templateConfig) {
        let firstLevelPath = `${path}/${key}`;
        let subPaths = templateConfig[key];

        if (subPaths.constructor.name === 'Object') {
            fs.mkdir(`${firstLevelPath}`, err => {
                Object.keys(subPaths).forEach(folder => {
                    fs.mkdir(`${firstLevelPath}/${folder}`, err => {
                        subPaths[folder].forEach(file => {
                            fs.writeFile(`${firstLevelPath}/${folder}/${file}`, '', err => {
                                console.log(err);
                            });
                        });
                    });
                });
            })
        }

        if (subPaths.constructor.name === 'Array') {
            fs.mkdir(`${firstLevelPath}`, err => {
                subPaths.forEach(file => {
                    fs.writeFile(`${firstLevelPath}/${file}`, '', err => {
                        console.log(err);
                    });
                })
            })
        }

        if (subPaths.constructor.name === 'String') {
            fs.writeFile(`${firstLevelPath}`, '', err => {
                console.log(err);
            });
        }



    }

    console.log('success');
});