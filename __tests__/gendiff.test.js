import fs, { read } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('step3', () => {
  expect(diff('before.json', 'after.json')).toEqual(readFile('expectedFile.json'));
});

test('step6', () => {
  expect(diff('tree1.json', 'tree2.json')).toEqual(readFile('expectedTree.json'));
});
