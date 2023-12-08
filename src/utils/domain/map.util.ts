export const mapToArray = <T, K>(map: Map<T, K>) => {
  const arr: [T, K][] = [];
  for (const item of map) arr.push(item);
  return arr;
};
