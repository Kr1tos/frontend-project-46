#!/usr/bin/env node

import { Command } from "commander";
import compare from '../src/index.js';

const program = new Command();

program
  .name('gendif')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(compare(filepath1, filepath2));
  });

program.parse();