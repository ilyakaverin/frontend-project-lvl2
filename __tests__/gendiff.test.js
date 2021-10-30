import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/index.js';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const formats = [['stylish', 'expectedTree.json'], ['plain', 'plainResult.txt'], ['json', 'jsonResult.txt']];

test.each(formats)('all styles', (style, expected) => {
  expect(diff('tree1.json', 'tree2.json', style)).toBe(readFile(expected));
});
