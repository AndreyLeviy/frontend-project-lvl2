import * as path from 'path';
import fs from 'fs';
import parser from './parser.js';
import getFormatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFileExtension = (filePath) => path.extname(filePath);
const getFileData = (filePath) => fs.readFileSync(filePath);

const getParsedFile = (filePath) => {
  const fileExtension = getFileExtension(filePath);
  const fileData = getFileData(filePath);
  return parser(fileData, fileExtension);
};

const genDiff = (filePath1, filePath2, format) => {
  const parsedFile1 = getParsedFile(filePath1);
  const parsedFile2 = getParsedFile(filePath2);
  const formatDiff = getFormatter(format);
  const tree = buildTree(parsedFile1, parsedFile2);
  return formatDiff(tree);
};

export default genDiff;
