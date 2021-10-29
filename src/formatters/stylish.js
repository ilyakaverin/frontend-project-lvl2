import _ from 'lodash';

const space = (depth) => {
  const replacer = ' ';
  const tab = 2;
  const doubleTab = 4;

  return replacer.repeat(depth === 0 ? tab : tab + depth * doubleTab);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const obj = Object.entries(data);

  const res = obj.map(([key, value]) => (depth === 0 ? `\n${space(depth + 1)}  ${key}: ${stringify(value, depth + 1)}` : `{\n${space(depth + 1)}  ${key}: ${stringify(value, depth + 1)}\n${space(depth)}  }`));
  return res.reduce((acc, item) => acc + item, '').split();
};

const stylish = (tree, depth = 0) => tree.map(({
  status, key, value, before, after, children,
}) => {
  const string = typeof value === 'object' && depth === 0 ? `${key}: {${stringify(value, depth)}\n${space(depth)}  }` : `${key}: ${stringify(value, depth)}`;

  switch (status) {
    case 'deleted':
      return `${space(depth)}- ${string}`;
    case 'added':
      return `${space(depth)}+ ${string}`;
    case 'unchanged':
      return `${space(depth)}  ${string}`;
    case 'changed':
      return `${space(depth)}- ${key}: ${stringify(before, depth)}\n${space(depth)}+ ${key}: ${stringify(after, depth)}`;
    case 'nested':
      return `${space(depth)}  ${key}: {\n${stylish(children, depth + 1)}\n${space(depth)}  }`;
    default:
      throw new Error('error');
  }
}).join('\n');

export default (tree) => `{\n${stylish(tree)}\n}`;
