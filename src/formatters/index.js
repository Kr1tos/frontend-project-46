import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  json: JSON.stringify,
  stylish: (data) => `{\n${stylish(data)}\n}`,
};

const formatter = (data, style = 'stylish') => {
  const format = formatters[style];
  if (!format) {
    throw new Error(`Invalid style: ${style}`);
  }

  return format(data);
};

export default formatter;
