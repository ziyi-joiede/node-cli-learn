#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const path = process.cwd();

let question = [{
    name: 'name',
    type: 'input',
    message: '请输入组件名称:',
    validate: (val) => {
        if (!val) {
            return '组件名称不准为空,请重新输入!'
        }
        return true;
    }
}];

inquirer.prompt(question).then(answer => {
    fs.mkdir(`${path}/${answer.name}`, err => {
        if (err) {
            console.log(err);
        }
        fs.writeFileSync(`${path}/${answer.name}/${answer.name}.js`, '');
        fs.writeFileSync(`${path}/${answer.name}/${answer.name}.css`, '');
        fs.writeFileSync(`${path}/${answer.name}/${answer.name}.html`, '');
    })
})