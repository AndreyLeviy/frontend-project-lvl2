import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (format) => {
  const formats = { plain, json, stylish };
  return formats[format];
};

export default getFormatter;
