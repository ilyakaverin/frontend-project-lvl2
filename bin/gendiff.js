#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((data1, data2) => {
    console.log(genDiff(data1, data2));
  });
program.parse(process.argv);
