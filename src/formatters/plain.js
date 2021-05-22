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
    switch (val.change) {
      case 'object':
        return plain(val.children, [...path, val.name]);
      case 'added':
        return [`Property '${[...path, val.name].join('.')}' was added with value: ${stringify(val.value2)}`];
      case 'not_changed':
        return [];
      case 'changed':
        return [`Property '${[...path, val.name].join('.')}' was updated. From ${stringify(val.value1)} to ${stringify(val.value2)}`];
      case 'deleted':
        return [`Property '${[...path, val.name].join('.')}' was removed`];
      default:
        return [];
    }
  };

  const result = arg.flatMap((val) => func(val)).join('\n');
  return result;
};

export default plain;
