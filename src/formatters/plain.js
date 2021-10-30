import _ from 'lodash';

const get = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isNull(value) || _.isBoolean(value)) || _.isNumber(value) ? value : `'${value}'`;
};

const plain = (tree, path = '') => tree.map(({
  status, key, value, before, after, children,
}) => {
  const buildPath = path === '' ? key : `${path}.${key}`;

  switch (status) {
    case 'added':
      return `Property '${buildPath}' was added with value: ${get(value)}`;
    case 'deleted':
      return `Property '${buildPath}' was removed`;
    case 'changed':
      return `Property '${buildPath}' was updated. From ${get(before)} to ${get(after)}`;
    case 'nested':
      return plain(children, buildPath);
    case 'unchanged':
      return null;
    default:
      throw new Error(`invalid ${status}`);
  }
}).flat().filter((item) => item !== null).join('\n');

export default (tree) => plain(tree);
