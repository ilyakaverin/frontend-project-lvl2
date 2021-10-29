import stylish from './stylish.js';

export const stringify = (tree) => JSON.stringify(tree);

export default (format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'json':
      return stringify;

    default:
      throw new Error(`${format} is not supported`);
  }
};
