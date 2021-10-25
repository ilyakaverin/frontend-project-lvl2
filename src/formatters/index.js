import stylish from './stylish.js';

export default (format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish;
    default: return 'error';
  }
};
