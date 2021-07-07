import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const fileToRead = (fileName) => fs.readFileSync(path.resolve(`${process.cwd()}/__fixtures__`, fileName), 'utf-8');

const ext = (filename) => path.extname(filename).slice(1);

const parse = (filename) => {
  switch (ext(filename)) {
    case 'json':
      return JSON.parse(fileToRead(filename));
    case 'yaml' || 'yml':
      return yaml.safeLoad(fileToRead(filename));
    default:
      return 'unsupported extension';
  }
};
export default parse;
