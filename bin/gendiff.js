#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    const result = genDiff(filePath1, filePath2, options.format);
    console.log(filePath1, filePath2, options);
    console.log(result);
  });

program.parse(process.argv);
