/* eslint-disable no-case-declarations */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-else-return */
import _ from 'lodash';

const valueToLine = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } else if (_.isString(value)) {
    return `'${value}'`;
  } else {
    return String(value);
  }
};

const plain = (data) => {
  const getLines = (obj, parentKey = '') => {
    const { key, status } = obj;
    const prefixedKey = parentKey ? `${parentKey}.${key}` : key;
    switch (status) {
      case 'nested':
        return obj.children.flatMap((child) =>
          getLines(child, prefixedKey));
      case 'updated':
        const [oldValue, newValue] = obj.value;
        return `Property '${prefixedKey}' was updated. From ${valueToLine(
          oldValue,
        )} to ${valueToLine(newValue)}`;
      case 'removed':
        return `Property '${prefixedKey}' was removed`;
      case 'added':
        return `Property '${prefixedKey}' was added with value: ${valueToLine(
          obj.value,
        )}`;
      default:
        return [];
    }
  };
  const lines = data.flatMap((obj) => getLines(obj));
  return lines.join('\n');
};

export default plain;
