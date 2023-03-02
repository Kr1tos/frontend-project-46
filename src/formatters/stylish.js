/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
import _ from 'lodash';

const interval = 4;

const makeSpaces = (depth) => ' '.repeat(interval * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return String(value);
  const lines = _.entries(value).map(([key, val]) => {
    const innerSpaces = makeSpaces(depth + 1);
    return `${innerSpaces}${key}: ${stringify(val, depth + 1)}`;
  });
  const spaces = makeSpaces(depth);
  return `{\n${lines.join('\n')}\n${spaces}}`;
};

const formatNode = (node, depth) => {
  const { key, status, value, children } = node;
  const spacesBeforeBrackets = makeSpaces(depth);
  const spaces = ' '.repeat(interval * depth - 2);

  switch (status) {
    case 'nested':
      return `${spaces}  ${key}: {\n${formatData(children, depth + 1)}\n${spacesBeforeBrackets}}`;

    case 'updated': {
      const [initValue, newValue] = value.map((val) => stringify(val, depth));
      return `${spaces}- ${key}: ${initValue}\n${spaces}+ ${key}: ${newValue}`;
    }

    case 'removed':
      return `${spaces}- ${key}: ${stringify(value, depth)}`;

    case 'added':
      return `${spaces}+ ${key}: ${stringify(value, depth)}`;

    default: // unchanged
      return `${spaces}  ${key}: ${stringify(value, depth)}`;
  }
};

const formatData = (data, depth) => {
  const tree = data.map((node) => formatNode(node, depth));
  return tree.join('\n');
};

const stylish = (data) => formatData(data, 1);

export default stylish;
