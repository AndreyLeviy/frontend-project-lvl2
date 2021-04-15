import yaml from 'js-yaml';

const parser = (dataFile, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(dataFile);
  }
  if (fileExtension === '.yaml') {
    return yaml.load(dataFile);
  }
};

export default parser;
