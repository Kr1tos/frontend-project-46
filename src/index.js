import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const getDiffLine = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      return `+ ${key}: ${value2}`;
    }

    if (!Object.hasOwn(data2, key)) {
      return `- ${key}: ${value1}`;
    }

    if (value1 === value2) {
      return `  ${key}: ${value2}`;
    }

    return `- ${key}: ${value1}\n + ${key}: ${value2}`;
  };

  const diff = keys.reduce((acc, key) => {
    const stage = getDiffLine(key);
    return `${acc}\n ${stage}`;
  }, '');
  return `{${diff}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const ext1 = path.extname(absolutePath1);
  const ext2 = path.extname(absolutePath2);

  const data1 = parse(readFileSync(absolutePath1), ext1);
  const data2 = parse(readFileSync(absolutePath2), ext2);

  return buildDiff(data1, data2);
};

export default genDiff;
