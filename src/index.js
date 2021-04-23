import * as path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';
import getFormatter from '../formatters/index.js';

const getFileExtension = (filePath) => path.extname(filePath);
const getDataFile = (filePath) => fs.readFileSync(filePath);
const getFileKeys = (obj) => Object.keys(obj);
const getUnionKeys = (arr1, arr2) => _.union(arr1, arr2);

const buildTree = (obj1, obj2) => {
  const file1Keys = getFileKeys(obj1);
  const file2Keys = getFileKeys(obj2);
  const unionKeys = getUnionKeys(file1Keys, file2Keys);

  const treeDiff = _.sortBy(unionKeys)
    .flatMap((key) => {
      if (file1Keys.includes(key) && file2Keys.includes(key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          const child = buildTree(obj1[key], obj2[key]);
          return { name: key, change: 'object', children: child };
        } if (obj1[key] === obj2[key]) {
          return { name: key, change: 'not_changed', value: obj1[key] };
        }
        return {
          name: key, change: 'changed', value1: obj1[key], value2: obj2[key],
        };
      } if (file1Keys.includes(key)) {
        return { name: key, change: 'deleted', value1: obj1[key] };
      } if (file2Keys.includes(key)) {
        return { name: key, change: 'added', value2: obj2[key] };
      }
      return {};
    });
  return treeDiff;
};

const genDiff = (filePath1, filePath2, format) => {
  const fileExtension1 = getFileExtension(filePath1);
  const fileExtension2 = getFileExtension(filePath2);

  if (fileExtension1 !== fileExtension2) {
    console.log(new Error('FILES HAVE DIFFERENT EXTENSIONS!!!'));
  }

  const dataFile1 = getDataFile(filePath1);
  const dataFile2 = getDataFile(filePath2);

  const parsedFile1 = parser(dataFile1, fileExtension1);
  const parsedFile2 = parser(dataFile2, fileExtension2);

  const formatDiff = getFormatter(format);
  const tree = buildTree(parsedFile1, parsedFile2);
  return formatDiff(tree);
};

export default genDiff;
