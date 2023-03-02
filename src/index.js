import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';

// Define the getStage function as a separate helper function
const getStage = (data1, data2, key) => {
  const value1 = data1[key];
  const value2 = data2[key];
  if (!Object.hasOwn(data1, key)) {
    return `+ ${key}: ${value2}`;
  } else if (!Object.hasOwn(data2, key)) {
    return `- ${key}: ${value1}`;
  } else if (value1 === value2) {
    return `  ${key}: ${value2}`;
  } else {
    return `- ${key}: ${value1}\n + ${key}: ${value2}`;
  }
};

// Define the gendiff function as a separate helper function
const gendiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diff = keys.map((key) => getStage(data1, data2, key)).join('\n');
  return `{\n${diff}\n}`;
};

// Define the json function as a separate helper function
const json = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve(cwd(), filepath1)));
  const file2 = JSON.parse(readFileSync(path.resolve(cwd(), filepath2)));
  const result = gendiff(file1, file2);
  return result;
};

// Define the yaml function as a separate helper function
const yaml = '';

// Define the main function as a separate function
const genDiff = (filepath1, filepath2) => {
  const extension = path.extname(filepath1);
  if (extension === '.json') {
    return json(filepath1, filepath2);
  } else if (extension === '.yaml' || extension === '.yml') {
    return yaml(filepath1, filepath2);
  } else {
    throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default genDiff;