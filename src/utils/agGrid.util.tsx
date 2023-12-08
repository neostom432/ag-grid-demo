import { ColumnApi, GetMainMenuItemsParams, GridApi, MenuItemDef, SortDirection } from "ag-grid-community";
import { ColDefField, ValueSetterParams } from "ag-grid-community/dist/lib/entities/colDef";
import * as N from "fp-ts/lib/number";
import * as S from "fp-ts/lib/string";
import { match } from "ts-pattern";
import { getRows } from "./domain";
import { isInteger, isPositive } from "./number";
import { priceToNumber } from "./price.util";
import { SiganConfigType, sigan } from "./sigan";

export const getSelectedRows = <T,>(api: GridApi<T>) => {
  const selectedNodes = api.getSelectedNodes();

  return selectedNodes.map(({ data }) => data) as T[];
};

/**
 *
 * @param api : AgGrid의 api 객체
 * @returns grid의 모든 row를 삭제
 */
export const clearGrid = <T,>(api: GridApi<T>) => {
  if (api.isDestroyed()) return;

  const rows = getRows(api);
  api.applyTransaction({ remove: rows });
  api.redrawRows();
};

export const isGridSorting = (columnApi: ColumnApi) =>
  columnApi.getColumnState().some((v) => {
    return !!v.sort;
  });

export const getNextSort = (currentSort: SortDirection | undefined): SortDirection =>
  match(currentSort)
    .with("asc", () => "desc" as const)
    .with("desc", () => null)
    .otherwise(() => "asc" as const);

export const applySort = (columnApi: ColumnApi, colId: string, sort?: SortDirection) => {
  const state = columnApi.getColumnState();
  const newState = state.map((col) => {
    return { ...col, sort: col.colId === colId ? sort ?? null : col.sort };
  });
  columnApi.applyColumnState({ state: newState });
  return newState;
};

export const getMainMenuItems = (params: GetMainMenuItemsParams): (string | MenuItemDef)[] => {
  // you don't need to switch, we switch below to just demonstrate some different options
  // you have on how to build up the menu to return

  const { column, api, columnApi } = params;
  const menuItems = [
    "autoSizeThis",
    "resetColumns",
    "separator",
    {
      icon: column.isSortNone() ? `<img src="/tick-checked.svg" style="width: 16px; height:16px" />` : null,
      name: "정렬 없음",
      action: () => {
        applySort(columnApi, column.getColId(), null);
        api.redrawRows();
      },
    },
    {
      icon: column.isSortAscending() ? `<img src="/tick-checked.svg" style="width: 16px; height:16px" />` : null,
      name: "오름차순 정렬",
      action: () => {
        applySort(columnApi, column.getColId(), "asc");
        api.redrawRows();
      },
    },
    {
      icon: column.isSortDescending() ? `<img src="/tick-checked.svg" style="width: 16px; height:16px" />` : null,
      name: "내림차순 정렬",
      action: () => {
        applySort(columnApi, column.getColId(), "desc");
        api.redrawRows();
      },
    },
  ] as (string | MenuItemDef)[];

  return menuItems;
};

/**
 * 칼럼 셀값들의 총 합계를 구해주는 함수
 * @param api GridApi
 * @param key column의 field
 * @returns 칼럼 셀들의 총 합계
 */
export const getColumnSum = <T,>(api: GridApi<T>, key: ColDefField<T>) => {
  let sum = 0;
  api.forEachNode((node) => {
    if (!node.data) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const target = key.split(".").reduce((o: string, i) => o?.[i], node.data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const curNum = !Number.isNaN(priceToNumber(target)) ? priceToNumber(target) : 0;
    sum += curNum;
  });

  return sum;
};

/**
 * valueSetter에서 사용가능
 * @param params ag-grid value setter params
 * @returns 정수/음수 여부를 판단
 */
export const invalidCellValue = (params: ValueSetterParams) => {
  const { newValue } = params;
  if (Number.isNaN(newValue)) return true;
  if (!isInteger(newValue)) return true;
  if (!isPositive(newValue)) return true;
  if (newValue > 100_000_000) return true;
  return false;
};

export const baseFilterComparator = (a: unknown, b: unknown) => {
  if (typeof a === "string" && !Number.isNaN(priceToNumber(a, true)) && typeof b === "string" && !Number.isNaN(priceToNumber(b, true))) {
    return N.Ord.compare(priceToNumber(a), priceToNumber(b));
  }
  if (typeof a === "string" && sigan(a).isValid() && typeof b === "string" && sigan(b).isValid()) {
    return sigan(a).diff(sigan(b), "d");
  }
  if (typeof a === "string" && typeof b === "string") return S.Ord.compare(a, b);
  if (typeof a === "number" && typeof b === "number") return N.Ord.compare(a, b);
  return 0;
};

export const formatTableSigan = (data?: SiganConfigType, format?: string) => {
  if (!data) return "-";
  return sigan(data).format(format);
};
