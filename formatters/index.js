import genDiff from '../src/index.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formattedDif = (filePath1, filePath2, formatter) => {
  if (formatter === 'plain') {
    return genDiff(filePath1, filePath2, plain);
  }
  if (formatter === 'json') {
    return genDiff(filePath1, filePath2, json);
  }
  return genDiff(filePath1, filePath2, stylish);
};

export default formattedDif;
