const stylish = (arg, depth = 1) => {
  const tab = ' '.repeat(4);
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

      const strMark = `${indent}${mark}${val.name}: ${stylish(val.children, depth + 1)}`;
      const strMarkPlus = `${indent}${markPlus}${val.name}: ${stylish(val.value2, depth + 1)}`;
      const strMarkMinus = `${indent}${markMinus}${val.name}: ${stylish(val.value1, depth + 1)}`;

      if (val.change === 'object') {
        return strMark;
      }
      if (val.change === 'added') {
        return strMarkPlus;
      }
      if (val.change === 'deleted') {
        return strMarkMinus;
      }
      if (val.change === 'changed') {
        return `${strMarkMinus}\n${strMarkPlus}`;
      }
      if (val.change === 'not_changed') {
        return `${indent}${mark}${val.name}: ${val.value}`;
      }
    })
      .join('\n');
    return `{\n${str}\n${indent}}`;
  }
  return `${arg}`;
};

export default stylish;
