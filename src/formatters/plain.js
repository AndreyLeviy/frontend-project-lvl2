const stringify = (val) => {
  if (typeof val === 'object' && val !== null) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return `${val}`;
};

const plain = (arg, path = []) => {
  const func = (val) => {
    if (val.change === 'object') {
      return plain(val.children, [...path, val.name]);
    }
    if (val.change === 'added') {
      return [`Property '${[...path, val.name].join('.')}' was added with value: ${stringify(val.value2)}`];
    }
    if (val.change === 'not_changed') {
      return [];
    }
    if (val.change === 'changed') {
      return [`Property '${[...path, val.name].join('.')}' was updated. From ${stringify(val.value1)} to ${stringify(val.value2)}`];
    }
    if (val.change === 'deleted') {
      return [`Property '${[...path, val.name].join('.')}' was removed`];
    }
    return [];
  };
  const result = arg.flatMap((val) => func(val)).join('\n');
  return result;
};

export default plain;
