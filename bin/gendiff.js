#!/usr/bin/env node

import { Command } from 'commander';
import formattedDif from '../formatters/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    const format = formattedDif(filePath1, filePath2, options.format);
    console.log(format);
  });

program.parse(process.argv);
