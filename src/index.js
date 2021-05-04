import * as path from 'path';
import fs from 'fs';
import parser from './parser.js';
import getFormatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFileExtension = (filePath) => path.extname(filePath);
const getDataFile = (filePath) => fs.readFileSync(filePath);

const parseFile = (filePath) => {
  const fileExtension = getFileExtension(filePath);
  const dataFile = getDataFile(filePath);
  return parser(dataFile, fileExtension);
};

const genDiff = (filePath1, filePath2, format) => {
  const parsedFile1 = parseFile(filePath1);
  const parsedFile2 = parseFile(filePath2);
  const formatDiff = getFormatter(format);
  const tree = buildTree(parsedFile1, parsedFile2);
  return formatDiff(tree);
};

export default genDiff;
