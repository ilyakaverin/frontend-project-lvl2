import genDiff from './genDiff.js';
import parse from './parser.js';
import formatter from './formatters/index.js';

export default (file1, file2, format) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const ast = genDiff(data1, data2);

  return formatter(format)(ast);
};
