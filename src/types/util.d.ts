export {};

declare global {
  type StringArrayToStringUnion<T extends readonly unknown[]> = T[number];
  type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
}
