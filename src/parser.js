import yaml from 'js-yaml';
import _ from 'lodash';

const formatAndParser = { json: JSON.parse, yml: yaml.load, yaml: yaml.load };

const getParser = (format) => {
  if (_.has(formatAndParser, format)) {
    return formatAndParser[format];
  }
  throw new Error('not supported format');
};

const parse = (data, format) => getParser(format)(data);
export default parse;
