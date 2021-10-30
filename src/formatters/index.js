import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'json':
      return json;
    case 'plain':
      return plain;

    default:
      throw new Error(`${format} is not supported`);
  }
};
