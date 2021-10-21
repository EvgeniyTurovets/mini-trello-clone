export const requiredName = (value) => (value ? undefined : 'Empty name!');
export const emptyName = (value) =>
  !/^\s*$/.test(value) ? undefined : 'Empty name!';
