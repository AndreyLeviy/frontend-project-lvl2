import yaml from 'js-yaml';

const getParse = (format) => {
  if (format === 'json') {
    return JSON.parse;
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load;
  }
  throw new Error('not supported format');
};

const parse = (data, format) => getParse(format)(data);
export default parse;
