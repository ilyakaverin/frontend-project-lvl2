import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('step4', () => {
  expect(genDiff('before.json', 'after.json')).toEqual(readFile('expectedFile.json'));
});

test('step5', () => {
  expect(genDiff('before.yaml', 'after.yaml')).toEqual(readFile('expectedFile.json'));
});
test('step6', () => {
  expect(genDiff('tree1.json', 'tree2.json')).toEqual(readFile('expectedTree.json'));
});
