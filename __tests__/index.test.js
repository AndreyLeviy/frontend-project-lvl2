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

test('genDiffTest Stylish JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(referenceStylish);
});
test('genDiffTest Stylish YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(referenceStylish);
});
test('genDiffTest Plain JSON', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(referencePlain);
});

test('genDiffTest Plain YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(referencePlain);
});

test('genDiffTest json JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');

  expect(genDiff(filePath1, filePath2, 'json')).toEqual(referenceJson);
});
test('genDiffTest json YAML', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');

  expect(genDiff(filePath1, filePath2, 'json')).toEqual(referenceJson);
});

const stylishHexlet = readFile('result_stylish.txt');
const plainHexlet = readFile('result_plain.txt');
test('HexletCheckFixtures Stylish JSON', () => {
  const filePath1 = getFixturePath('file1Hexlet.json');
  const filePath2 = getFixturePath('file2Hexlet.json');

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishHexlet);
});
test('HexletCheckFixtures Stylish YAML', () => {
  const filePath1 = getFixturePath('file1Hexlet.yml');
  const filePath2 = getFixturePath('file2Hexlet.yml');

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishHexlet);
});

test('HexletCheckFixtures Plain JSON', () => {
  const filePath1 = getFixturePath('file1Hexlet.json');
  const filePath2 = getFixturePath('file2Hexlet.json');

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainHexlet);
});
test('HexletCheckFixtures Plain YAML', () => {
  const filePath1 = getFixturePath('file1Hexlet.yml');
  const filePath2 = getFixturePath('file2Hexlet.yml');

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainHexlet);
});
