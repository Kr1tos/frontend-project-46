import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

const expectedResStylish = readFile('Stylish.txt');
const expectedResPlain = readFile('Plain.txt');
const expectedResJSON = readFile('JSON.txt');

test('two json files. Stylish', () => {
  const testFilePath1 = getFixturePath('file1.json');
  const testFilePath2 = getFixturePath('file2.json');
  expect(genDiff(testFilePath1, testFilePath2, 'stylish')).toEqual(expectedResStylish);
});

test('yaml files. Stylish', () => {
  const testFilePath1 = getFixturePath('file1.yml');
  const testFilePath2 = getFixturePath('file2.yml');
  expect(genDiff(testFilePath1, testFilePath2, 'stylish')).toEqual(expectedResStylish);
});

test('two json files. Plain', () => {
  const testFilePath1 = getFixturePath('file1.json');
  const testFilePath2 = getFixturePath('file2.json');
  expect(genDiff(testFilePath1, testFilePath2, 'plain')).toEqual(expectedResPlain);
});

test('yaml files. Plain', () => {
  const testFilePath1 = getFixturePath('file1.yml');
  const testFilePath2 = getFixturePath('file2.yml');
  expect(genDiff(testFilePath1, testFilePath2, 'plain')).toEqual(expectedResPlain);
});

test('two json files. JSON', () => {
  const testFilePath1 = getFixturePath('file1.json');
  const testFilePath2 = getFixturePath('file2.json');
  expect(genDiff(testFilePath1, testFilePath2, 'json')).toEqual(expectedResJSON);
});

test('yaml files. JSON', () => {
  const testFilePath1 = getFixturePath('file1.yml');
  const testFilePath2 = getFixturePath('file2.yml');
  expect(genDiff(testFilePath1, testFilePath2, 'json')).toEqual(expectedResJSON);
});
