#!/usr/bin/env node

const program = require('commander');
const pkg = require('../../package.json');

// 定义当前版本
// 定义使用方法
// 定义三个指令
program
    .version(pkg.version)
    .usage('<command> [Options]')
    .command('create-init', '初始化工程目录')
    .command('create-folder', '初始化组件')

program.parse(process.argv);