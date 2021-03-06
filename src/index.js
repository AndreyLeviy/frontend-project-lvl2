import * as path from 'path';
import fs from 'fs';
import parse from './parser.js';
import getFormatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFormat = (filePath) => path.extname(filePath).substr(1);
const getFileData = (filePath) => fs.readFileSync(filePath);

const getParsedData = (filePath) => {
  const fileExtension = getFormat(filePath);
  const fileData = getFileData(filePath);
  return parse(fileData, fileExtension);
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const parsedData1 = getParsedData(filePath1);
  const parsedData2 = getParsedData(filePath2);
  const formatDiff = getFormatter(format);
  const tree = buildTree(parsedData1, parsedData2);
  return formatDiff(tree);
};

export default genDiff;
