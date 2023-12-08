import { getEq } from "fp-ts/Array";
import { concatAll } from "fp-ts/Semigroup";
import * as N from "fp-ts/number";
import * as S from "fp-ts/string";

/**
 * 배열 인자의 합을 구한다.
 */
export const getArrSum = concatAll(N.SemigroupSum)(0);

/**
 *
 * @param arr1 첫번째 string array
 * @param arr2 두번쨰 string array
 * @returns 두 개의 문자열 배열이 동일한 값을 가지고 있는지 확인하는 함수
 */
export const isArraysEqual = (arr1: string[], arr2: string[]) => {
  const E = getEq(S.Eq);
  return E.equals(arr1, arr2);
};
