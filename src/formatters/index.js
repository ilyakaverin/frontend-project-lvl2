import stylish from './stylish.js';
import plain from './plain.js';

export const stringify = (tree) => JSON.stringify(tree);

export default (format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'json':
      return stringify;
    case 'plain':
      return plain;

    default:
      throw new Error(`${format} is not supported`);
  }
};
