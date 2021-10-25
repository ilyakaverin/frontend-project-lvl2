#!/usr/bin/env node
import program from 'commander';
import diff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: stylish', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((data1, data2) => {
    console.log(diff(data1, data2, program.format));
  });
program.parse(process.argv);
