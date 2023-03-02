import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import formatter from '../src/formatters/index.js';
import createComparisonTree from './makeTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const content = fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
  const type = path.extname(filepath).slice(1);
  return parse(content, type);
};

const genDiff = (filepath1, filepath2, format) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  const comparisonTree = createComparisonTree(content1, content2);
  return formatter(comparisonTree, format);
};

export default genDiff;
