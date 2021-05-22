import _ from 'lodash';

const toString = (value, depth) => {
  const iter = (subvalue, subdepth = 1) => {
    const tab = '    ';
    const indent = tab.repeat(subdepth - 1);
    if (_.isObject(subvalue)) {
      const keys = Object.keys(subvalue);
      const str = keys.map((key) => `${tab.repeat(subdepth)}${key}: ${iter(subvalue[key], subdepth + 1)}`)
        .join('\n');
      return `{\n${str}\n${indent}}`;
    }
    return `${subvalue}`;
  };
  return iter(value, depth);
};

const stylish = (tree) => {
  const iter = (subtree, subdepth = 1) => {
    const tab = '    ';
    const indent = tab.repeat(subdepth - 1);
    if (!Array.isArray(subtree)) throw new Error('');
    const str = subtree.map((val) => {
      const mark = '    ';
      const markPlus = '  + ';
      const markMinus = '  - ';

      const string = (marker, value, stringify) => `${indent}${marker}${val.name}: ${stringify(value, subdepth + 1)}`;
      switch (val.change) {
        case 'object':
          return string(mark, val.children, iter);
        case 'added':
          return string(markPlus, val.value2, toString);
        case 'deleted':
          return string(markMinus, val.value1, toString);
        case 'changed':
          return `${string(markMinus, val.value1, toString)}\n${string(markPlus, val.value2, toString)}`;
        case 'not_changed':
          return string(mark, val.value, toString);
        default:
          return '';
      }
    })
      .join('\n');
    return `{\n${str}\n${indent}}`;
  };
  return iter(tree);
};

export default stylish;
