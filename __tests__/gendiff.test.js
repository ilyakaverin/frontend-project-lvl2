import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('step4', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile('expectedFile.json'));
});
