const stylish = (arg, depth = 1) => {
  const tab = '    ';
  const indent = tab.repeat(depth - 1);

  if (typeof arg === 'object' && arg !== null && Array.isArray(arg) !== true) {
    const keys = Object.keys(arg);
    const str = keys.map((key) => `${tab.repeat(depth)}${key}: ${stylish(arg[key], depth + 1)}`)
      .join('\n');
    return `{\n${str}\n${indent}}`;
  }
  if (Array.isArray(arg) === true) {
    const str = arg.map((val) => {
      const mark = '    ';
      const markPlus = '  + ';
      const markMinus = '  - ';

      const string = (marker, value) => `${indent}${marker}${val.name}: ${stylish(value, depth + 1)}`;

      if (val.change === 'object') {
        return string(mark, val.children);
      }
      if (val.change === 'added') {
        return string(markPlus, val.value2);
      }
      if (val.change === 'deleted') {
        return string(markMinus, val.value1);
      }
      if (val.change === 'changed') {
        return `${string(markMinus, val.value1)}\n${string(markPlus, val.value2)}`;
      }
      if (val.change === 'not_changed') {
        return `${indent}${mark}${val.name}: ${val.value}`;
      }
      return '';
    })
      .join('\n');
    return `{\n${str}\n${indent}}`;
  }
  return `${arg}`;
};

export default stylish;
