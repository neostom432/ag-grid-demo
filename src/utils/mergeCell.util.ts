import { RowSpanParams } from "ag-grid-community";
import { isGridSorting } from "./agGrid.util";

type KeyInfo = {
  [key: string]: { span: number; rowId: number };
};

/**
 * span할 정보를 만들어내는 함수
 * @param keys 합병할 Cell명을 0번째부터 순서대로 입력된 배열
 * @param data Table에 넘길 데이터
    keys: ['styleCode', 'color']
    data: [
      { id: 0, styleCode: '3AWS124', color: '50BKS', size: 'M' } ,
      { id: 1, styleCode: '3AWS124', color: '50BKS', size: 'L'} ,
      { id: 2, styleCode: '3AWS124', color: '50CKS', size: 'S'}
    ],
--------------------------------------------------------------------------
 *  @returns [span 정보가 담긴 객체, 입력된 keys]
    {
      '3AWS124: { span: 3, rowId: 0 },
      '3AWS124.50BKS': { span: 2, rowId: 0 },
      '3AWS124.50CKS': { span: 1, rowId: 2 },
    }

 */

export const createMergeInfo = <T extends object>(keys: string[], data: T[] | null | undefined): ReturnType<typeof getSpanCnt> => {
  if (!data?.length) {
    return getSpanCnt([undefined, []]);
  }

  const keyInfo: KeyInfo = data.reduce((result: KeyInfo, info: T, idx: number) => {
    let newKey = "";
    keys.forEach((key: string) => {
      newKey = newKey === "" ? String(info[key as keyof T]) : [newKey, String(info[key as keyof T])].join(".");
      if (result[newKey]) result[newKey].span += 1;
      else result[newKey] = { span: 1, rowId: idx };
    });
    return result;
  }, {} as KeyInfo);

  return getSpanCnt([keyInfo, keys]);
};

/**
 * span할 값을 return 하는 함수
 * @param [mergeInfo, cellKeys] mergeCell을 통해서 만든 값 [span값들이 저장된 객체, 합병할 Cell명을 0번째부터 순서대로 입력된 배열]
 * @param target 현재 컬럼의 field값
 * @param params 각 rowSpan의 params 값
 * @returns row-span할 값
 */

const getSpanCnt =
  ([mergeInfo, cellKeys]: [KeyInfo | undefined, string[]]) =>
  (target: string) =>
  (params: RowSpanParams) => {
    let newKey = "";
    let isContinue = true;

    if (isGridSorting(params.columnApi)) return 1;

    cellKeys.forEach((key: string) => {
      if (isContinue) {
        newKey = newKey === "" ? params.data[key] : [newKey, params.data[key]].join(".");
        if (key === target) isContinue = false;
      }
    });
    if (mergeInfo && mergeInfo[newKey] && mergeInfo[newKey].rowId === params.node?.rowIndex) {
      return mergeInfo[newKey].span;
    }
    return 0;
  };
