import { load } from 'js-yaml';

const parse = (data, type) => {
  const parsers = {
    json: JSON.parse,
    yml: load,
  };

  const parseFn = parsers[type];
  if (!parseFn) {
    throw new Error('improper data type');
  }

  return parseFn(data);
};

export default parse;
