import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiff from '../src/genDiff.js';

test('step4', () => {
  const fixt = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  expect(genDiff('file1.json', 'file2.json')).toEqual(fixt);
});
