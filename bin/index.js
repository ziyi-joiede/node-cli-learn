#!/usr/bin/env node

// const chalk = require('chalk');
// console.log(chalk.red('this is a danger message'));

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');

program.command('create <filename>')
    .description('创建一个新的文件夹')
    .option('-d,--dest <path>', '文件夹路径', '.')
    .action((filename, cmdObj) => {
        // 判断文件夹路径是否存在,
        // 如果不存在需要创建文件结构
        mkdir(cmdObj.dest);
        inquirer.prompt([{
                name: 'extend',
                type: 'list',
                message: '选择要创建的文件类型',
                choices: [
                    { name: 'html 文件', value: 'html' },
                    { name: 'css 文件', value: 'css' },
                    { name: 'javascript 文件', value: 'js' }
                ]
            }, {
                name: 'content',
                type: 'editor',
                message: '输入文件内容'
            }])
            .then(answers => {
                fs.writeFileSync(`${cmdObj.dest}/${filename}.${answers.extend}`, answers.content);
            });
    });

function mkdir(path) {
    let p = path.split('/');

    let dir = p.reduce((accumulator, item) => {
        if (!fs.existsSync(accumulator)) {
            fs.mkdirSync(accumulator);
        }
        return accumulator + '/' + item
    }, '.');

    // 创建最后的根目录
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

program.parse(process.argv);
// 如果参数少于2个弹出帮助提示
if (!process.argv.slice(2).length) {
    program.outputHelp();
}