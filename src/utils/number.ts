import { Ordering } from "fp-ts/lib/Ordering";
import { priceToNumber } from "./price.util";

export const findMax = (nums: number[]) => Math.max(...nums);
export const findMinMax = (...arr: number[]) => [Math.min(...arr), findMax(arr)];

export const isInRange = (range: [number | undefined, number | undefined], num: number, includeEdge?: boolean | [boolean, boolean]) => {
  const [left, right] = range;
  const [min, max] = findMinMax(left || 0, right || Number.MAX_SAFE_INTEGER);

  let includeLeft = false;
  let includeRight = false;
  if (includeEdge === true) {
    includeLeft = true;
    includeRight = true;
  }
  if (Array.isArray(includeEdge) && includeEdge.length === 2) {
    [includeLeft, includeRight] = includeEdge;
  }
  const leftPredicate = (n: number) => (includeLeft ? n >= min : n > min);
  const rightPredicate = (n: number) => (includeRight ? n <= max : n < max);

  return leftPredicate(num) && rightPredicate(num);
};

export const ACENDING = (A: number, B: number) => A - B;
export const DESCENDING = (A: number, B: number) => B - A;

export const clamp = (value: number, minValue: number, maxValue: number): number => Math.min(Math.max(value, minValue), maxValue);

export const toOrd = (n: number): Ordering => {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
};

export function divideWithRemainder(dividend: number, divisor: number) {
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  return {
    quotient,
    remainder,
  };
}
/**
 *
 * @param num 숫자형태의 값
 * @returns 정수여부
 */
export const isInteger = (num: string | number) => Number.isInteger(priceToNumber(num));

/**
 *
 * @param num 숫자형태의 값
 * @returns 양수여부
 */
export const isPositive = (num: string | number) => priceToNumber(num) >= 0;

export const multiplyBy = (multiplier: number) => (num: number) => multiplier * num;
