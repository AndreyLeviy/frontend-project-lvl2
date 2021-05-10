import yaml from 'js-yaml';

const parser = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return 'not supported format';
};

export default parser;
