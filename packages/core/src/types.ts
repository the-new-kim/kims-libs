export type FixedLengthArray<T, N extends number> = N extends N
  ? T[] & { length: N }
  : never;
