import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formaters = { plain, json, stylish };
const getFormatter = (format) => {
  if (_.has(formaters, format)) {
    return formaters[format];
  }
  throw new Error(`not supported format ${format}`);
};

export default getFormatter;
