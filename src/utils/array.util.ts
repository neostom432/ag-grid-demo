export const getLength = <T extends { length: number }>(arr: T) => arr.length;
export const isExistingInArray = <T>(array: T[], predicate: (value: T) => boolean | T) =>
  typeof predicate === "function" ? array.some(predicate) : array.includes(predicate);

type SwapParams = {
  fromIndex: number;
  toIndex: number;
  length?: number;
};
export const swap = <T>(arr: T[], { fromIndex, toIndex, length = 1 }: SwapParams) => {
  const willMoveElements = arr.slice(fromIndex, fromIndex + length);
  const willUpdatedElements = arr.slice(toIndex, toIndex + length);

  Array.from({ length }).forEach((_, i) => {
    arr[fromIndex + i] = willUpdatedElements[i];
    arr[toIndex + i] = willMoveElements[i];
  });
  return arr;
};

export const shift = <T>(arr: T[], { fromIndex, toIndex, length = 1 }: SwapParams) => {
  const elements = arr.splice(fromIndex, length);

  const insertIndex = fromIndex > toIndex ? toIndex : toIndex + 1 - length;

  arr.splice(insertIndex, 0, ...elements);
  return arr;
};

export const qtyRecordAccumulator = (record: Record<string, number>, cur: Record<string, number>) => {
  Object.entries(cur).forEach(([key, value]) => {
    record[key] = (record[key] || 0) + value;
  });
  return record;
};
