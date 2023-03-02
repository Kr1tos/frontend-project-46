import _ from 'lodash';

const createComparisonTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwnProperty.call(data1, key)) {
      return { key, status: 'added', value: value2 };
    }

    if (!Object.hasOwnProperty.call(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }

    if (_.isEqual(value1, value2)) {
      return { key, status: 'unchanged', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested', children: createComparisonTree(value1, value2) };
    }

    return { key, status: 'updated', value: [value1, value2] };
  });
};

export default createComparisonTree;
