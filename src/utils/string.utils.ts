/**
 *
 * @param list string[]
 * @returns a 외 n-1개
 */

export const formatOther = (list: string[]) => {
  if (list.length === 1) {
    return list[0];
  }

  const otherCnt = list.length - 1;

  return `${list[0]} 외 ${otherCnt}개`;
};

const isUpperCaseOrNumber = /^[A-Z0-9]*$/i;
export const checkIsUnderThreeCharWithNumbeAndCap = (text: string) => {
  return !(!isUpperCaseOrNumber.test(text) || text.length > 3);
};
