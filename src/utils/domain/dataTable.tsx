import { isInRange } from "@/utils/number";
import { Column, ColumnApi, GridApi, IRowNode } from "ag-grid-community";

/**
 * AG grid의 모든 node를 가져오는 함수
 */
export const getRowNodes = <T,>(api: GridApi<T>) => {
  const nodes: IRowNode<T>[] = [];
  api.forEachNode((node) => nodes.push(node));
  return nodes;
};

/**
 * AG grid의 모든 row를 가져오는 함수
 */
export const getRows = <T,>(api: GridApi<T>) => {
  const rows: T[] = [];
  api.forEachNode((node) => {
    if (node.data) rows.push(node.data);
  });
  return rows;
};
/**
 * AG grid의 필터링 된 모든 row를 가져오는 함수
 */
export const getFilteredRows = <T,>(api: GridApi<T>) => {
  const rows: T[] = [];
  api.forEachNodeAfterFilter((node) => {
    if (node.data) rows.push(node.data);
  });
  return rows;
};

/**
 * colIndex를 가져오는 API가 없어서 만들 수 밖에 없었습니다.
 *
 * getAllGridColumns vs getCollumns
 *
 * 전자는 바꾼 순서까지 적용된 컬럼 배열을 리턴해주기 때문에 사용했습니다.
 */
export const getColIndex = (col: Column | string, columnApi: ColumnApi, onlyVisible = false) => {
  const columns = onlyVisible ? columnApi.getAllGridColumns().filter((c) => c.isVisible()) : columnApi.getAllGridColumns();
  const colId = typeof col === "string" ? col : col.getColId();
  return columns.findIndex((c) => c.getColId() === colId);
};

/**
 *
 * @param params - { unfoldIconIndex: number; hiddenColIds: string[]; }
 * @param columnApi
 *
 */
// columnApi.moveColumns, columnApi.moveColumn는 동작방식이 옮길 col을 삭제 -> 그 위치에 추가 방식이다.
// columnApi.moveColumns가 동작하는 방식이 visibleColumns들에서 동작하는게 아닌
// 숨겨진 col들까지 다 합쳐진 columns들에서 동작하기 때문에
// 펼칠때 만약 unfoldIconIndex보다 숨겨진 col들이 이전 index에 존재하면
// hiddenColIds의 개수만큼 옮길 index를 앞으로 땡겨줘야한다.
export const unfoldHiddenColumns = (params: ShowColumnParams, columnApi: ColumnApi) => {
  const { unfoldIconIndex, hiddenColIds } = params;
  const targetColumn = columnApi.getAllGridColumns().filter((c) => c.isVisible())[unfoldIconIndex];
  const targetIndex = getColIndex(targetColumn, columnApi);
  const firstHiddinColIndex = getColIndex(hiddenColIds[0], columnApi);

  const changedIndex = firstHiddinColIndex < targetIndex ? targetIndex - hiddenColIds.length + 1 : targetIndex + 1;

  columnApi.moveColumns(hiddenColIds, changedIndex);
  hiddenColIds.forEach((colId) => columnApi.setColumnVisible(colId, true));
};

/**
 * min, max를 자동으로 찾아서 사이에 있는 column들을 리턴합니다
 */
export const findColumnsBetweenIndexes = (
  columns: Column[],
  indexes: [number | undefined, number | undefined],
  includeIndexes?: boolean | [boolean, boolean]
) => {
  return columns.filter((_, index) => isInRange(indexes, index, includeIndexes));
};

export const getKeys = (hiddenColIdsMap: HiddenColIdsMap) => Object.keys(hiddenColIdsMap).map(Number);

export const setValueByNestedKey = (obj: Record<string, unknown>, key: string, value: unknown) => {
  const keys = key.split(".");
  let target = obj;
  for (const k of keys) {
    const isLast = k === keys[keys.length - 1];
    if (isLast) {
      target[k] = value;
    } else {
      target = target[k] as Record<string, unknown>;
    }
  }
};
/**
 * AG grid의 사이드바의 visibility를 toggle하는 함수
 */
export const toggleSidebarVisible = <T,>(api?: GridApi<T>) => {
  if (api === undefined) return;

  const target = !api?.isSideBarVisible();
  api.setSideBarVisible(target);
  if (target) {
    api.openToolPanel("filters");
  }
};
