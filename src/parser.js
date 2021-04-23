import yaml from 'js-yaml';

const parser = (dataFile, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(dataFile);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(dataFile);
  }
  return 'not supported format';
};

export default parser;
