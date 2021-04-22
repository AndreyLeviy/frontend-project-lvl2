import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(`${__dirname}`, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const referenceStylish = readFile('fileToEqualStylish.txt');
const referencePlain = readFile('fileToEqualPlain.txt');
const referenceJson = readFile('fileToEqualJson.txt');
const referenceStylish1 = readFile('fileToEqualStylish1.txt');

test('genDiffTest Stylish JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const result = `${genDiff(filePath1, filePath2, 'stylish')}\n`;
  expect(result).toEqual(referenceStylish);
});
test('genDiffTest Stylish YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const result = `${genDiff(filePath1, filePath2, 'stylish')}\n`;
  expect(result).toEqual(referenceStylish);
});
test('genDiffTest Plain JSON', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const result = `${genDiff(filePath1, filePath2, 'plain')}\n`;
  expect(result).toEqual(referencePlain);
});

test('genDiffTest Plain YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const result = `${genDiff(filePath1, filePath2, 'plain')}\n`;
  expect(result).toEqual(referencePlain);
});

test('genDiffTest json JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const result = `${genDiff(filePath1, filePath2, 'json')}\n`;
  expect(result).toEqual(referenceJson);
});
test('genDiffTest json YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const result = `${genDiff(filePath1, filePath2, 'json')}\n`;
  expect(result).toEqual(referenceJson);
});

test('genDiffTest1 Stylish JSON', () => {
  const filePath3 = getFixturePath('file3.json');
  const filePath4 = getFixturePath('file4.json');
  const result = `${genDiff(filePath3, filePath4, 'stylish')}\n`;
  expect(result).toEqual(referenceStylish1);
});
