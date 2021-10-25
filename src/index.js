import genDiff from './genDiff.js';
import parse from './parser.js';

export default (file1, file2) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const ast = genDiff(data1, data2);

  const jsonToFlat = (object) => {
    const entries = Object.entries(object);
    const res = entries.map((pair) => `  ${pair[0]}: ${pair[1]}`);
    const output = res.join('\n');
    return `{\n${output}\n}`;
  };

  const stylish = (tree) => {
    const map = {};
    tree.map(({
      status, key, value, before, after, children,
    }) => {
      if (status === 'deleted') {
        map[`- ${key}`] = value;
      }
      if (status === 'added') {
        map[`+ ${key}`] = value;
      }
      if (status === 'unchanged') {
        map[`  ${key}`] = value;
      }
      if (status === 'nested') {
        map[key] = stylish(children);
      }
      if (status === 'changed') {
        map[`- ${key}`] = before;
        map[`+ ${key}`] = after;
      }
    }).sort();

    return map;
  };

  return JSON.stringify(stylish(ast), null, 2)
};
