#!/usr/bin/env node

import pkg from 'commander';
import genDiff from '../src/index.js';

const { Command } = pkg;
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    console.log(genDiff(filePath1, filePath2, options.format));
  });

program.parse(process.argv);
