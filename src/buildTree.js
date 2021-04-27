import _ from 'lodash';

const getFileKeys = (obj) => Object.keys(obj);
const getUnionKeys = (arr1, arr2) => _.union(arr1, arr2);

const buildTree = (obj1, obj2) => {
  const file1Keys = getFileKeys(obj1);
  const file2Keys = getFileKeys(obj2);
  const unionKeys = getUnionKeys(file1Keys, file2Keys);

  const treeDiff = _.sortBy(unionKeys)
    .flatMap((key) => {
      if (file1Keys.includes(key) && file2Keys.includes(key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          const child = buildTree(obj1[key], obj2[key]);
          return { name: key, change: 'object', children: child };
        } if (obj1[key] === obj2[key]) {
          return { name: key, change: 'not_changed', value: obj1[key] };
        }
        return {
          name: key, change: 'changed', value1: obj1[key], value2: obj2[key],
        };
      } if (file1Keys.includes(key)) {
        return { name: key, change: 'deleted', value1: obj1[key] };
      } if (file2Keys.includes(key)) {
        return { name: key, change: 'added', value2: obj2[key] };
      }
      return {};
    });
  return treeDiff;
};

export default buildTree;
