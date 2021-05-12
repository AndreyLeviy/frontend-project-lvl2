import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const unionKeys = _.union(_.keys(obj1), _.keys(obj2));

  const treeDiff = _.sortBy(unionKeys)
    .flatMap((key) => {
      if (!_.has(obj2, key)) {
        return { name: key, change: 'deleted', value1: obj1[key] };
      }

      if (!_.has(obj1, key)) {
        return { name: key, change: 'added', value2: obj2[key] };
      }

      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const child = buildTree(obj1[key], obj2[key]);
        return { name: key, change: 'object', children: child };
      }

      if (_.isEqual(obj1[key], obj2[key])) {
        return { name: key, change: 'not_changed', value: obj1[key] };
      }

      return {
        name: key, change: 'changed', value1: obj1[key], value2: obj2[key],
      };
    });

  return treeDiff;
};

export default buildTree;
