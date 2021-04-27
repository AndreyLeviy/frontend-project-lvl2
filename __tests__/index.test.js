import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(`${__dirname}`, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const comparisonResultStylish = readFile('fileToEqualStylish.txt');
const сomparisonResultPlain = readFile('fileToEqualPlain.txt');
const сomparisonResultJson = readFile('fileToEqualJson.txt');

const extensions = ['json', 'yaml', 'yml'];
const comparisonResult = {
  stylish: comparisonResultStylish,
  plain: сomparisonResultPlain,
  json: сomparisonResultJson,
};

describe.each(extensions)('extension %s', (extension) => {
  test.each(['stylish', 'plain', 'json'])('format %s', (format) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);
    const result = genDiff(filePath1, filePath2, format);
    expect(result).toEqual(comparisonResult[format].trim());
  });
});
