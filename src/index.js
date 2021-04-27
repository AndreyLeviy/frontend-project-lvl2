import * as path from 'path';
import fs from 'fs';
import parser from './parser.js';
import getFormatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFileExtension = (filePath) => path.extname(filePath);
const getDataFile = (filePath) => fs.readFileSync(filePath);

const genDiff = (filePath1, filePath2, format) => {
  const fileExtension1 = getFileExtension(filePath1);
  const fileExtension2 = getFileExtension(filePath2);

  const dataFile1 = getDataFile(filePath1);
  const dataFile2 = getDataFile(filePath2);

  const parsedFile1 = parser(dataFile1, fileExtension1);
  const parsedFile2 = parser(dataFile2, fileExtension2);

  const formatDiff = getFormatter(format);
  const tree = buildTree(parsedFile1, parsedFile2);
  return formatDiff(tree);
};

export default genDiff;
