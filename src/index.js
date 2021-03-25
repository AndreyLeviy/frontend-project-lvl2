#!/usr/bin/env node

import fs from 'fs';
import _ from 'lodash';

const jsonWithoutQuotes = (objFromJson) => {
  const changeToStr = Object
    .keys(objFromJson)
    .map((key) => `  ${key}: ${objFromJson[key]}`)
    .join('\n');
  return `{\n${changeToStr}\n}`;
};

  const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1);
  const file2 = fs.readFileSync(pathToFile2);
  const toJsonFile1 = JSON.parse(file1);
  const toJsonFile2 = JSON.parse(file2);

  const file1Keys = Object.keys(toJsonFile1);
  const file2Keys = Object.keys(toJsonFile2);
  const unionKeys = _.union(file1Keys, file2Keys);

  const cb = (acc, key) => {
    if (file1Keys.includes(key) && file2Keys.includes(key)) {
      if (toJsonFile1[key] === toJsonFile2[key]) {
        acc[`  ${key}`] = toJsonFile1[key];
      } else {
        const plus = `+ ${key}`;
        const minus = `- ${key}`;
        acc[minus] = toJsonFile1[key];
        acc[plus] = toJsonFile2[key];
      }
    } else if (file1Keys.includes(key)) {
      acc[`- ${key}`] = toJsonFile1[key];
    } else {
      acc[`+ ${key}`] = toJsonFile2[key];
    }
    return acc;
  };

  const differenceJson = _.sortBy(unionKeys).reduce(cb, {});

  return jsonWithoutQuotes(differenceJson);
};

export default genDiff;
