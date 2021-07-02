/* eslint-disable array-callback-return */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const fileToRead = (fileName) => fs.readFileSync(path.resolve(`${process.cwd()}/__fixtures__`, fileName), 'utf-8');

// const ext = (pathToFile) => path.extname(pathToFile).slice(1);

export const jsonToFlat = (object) => {
  const entries = Object.entries(object);
  const res = entries.map((pair) => ` ${pair[0]}: ${pair[1]}`);
  const output = res.join('\n');
  return `{\n${output}\n}`;
};

const genDiff = (file1, file2) => {
  const data1 = JSON.parse(fileToRead(file1));
  const data2 = JSON.parse(fileToRead(file2));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = keys.sort();
  const map = {
    minus: '- ',
    plus: '+ ',
    unchanged: '  ',
  };
  const result = {};
  sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      result[map.minus + key] = data1[key];
    } else if (_.has(data1, key) && data1[key] !== data2[key]) {
      result[map.minus + key] = data1[key];
      result[map.plus + key] = data2[key];
    } else if (data1[key] !== data2[key]) {
      result[map.plus + key] = data2[key];
    } else {
      result[map.unchanged + key] = data1[key];
    }
  });
  return jsonToFlat(result);
};

export default genDiff;
