/* eslint-disable array-callback-return */
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = _
    .union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = keys.sort();

  // eslint-disable-next-line consistent-return
  const ast = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { status: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { status: 'deleted', key, value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { status: 'unchanged', key, value: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { status: 'nested', key, children: genDiff(data1[key], data2[key]) };
    }
    if (_.has(data1, key) && data1[key] !== data2[key]) {
      return {
        status: 'changed', key, before: data1[key], after: data2[key],
      };
    }
  });
  return ast;
};

export default genDiff;
