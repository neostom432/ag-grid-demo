// rule
// 연관된 상수끼리 묶어주기
// 단일상수라면 객체말고 원시값으로 선언해주기

import { formatStrPrice } from "@/utils";
import { ColDef, ValueFormatterParams } from "ag-grid-community";

export const TABLE_COLUMN = {
  WIDTH: 40,
  HEIGHT: 50,
};

export const TABLE_ROW = {
  WIDTH: 70,
  HEIGHT: 90,
};

export const CELL_SIZE = 40;

export const GridPinOption = <T>(position: boolean | "left" | "right" = "left"): ColDef<T> => ({
  pinned: position,
  lockPinned: true,
  lockPosition: position,
  filterParams: {
    treeList: false,
  },
});

export const numberColumnOption: ColDef = {
  filter: "agNumberColumnFilter",
  valueFormatter: (e: ValueFormatterParams) => formatStrPrice(e.value ?? 0),
};

export const CHECKBOX_COL_ID = "checkbox" as const;
export const DELETE_COL_ID = "delete" as const;

export const HEADER_HEIGHT = 32;
export const DATA_ROW_HEIGHT = 24;

export const PROD_HEADER = {
  ssnCd: "시즌",
  prodCd: "스타일",
  colorCd: "컬러",
  sizCd: "사이즈",
  prodNm: "품명",
  image: "이미지",
};

export const CELL_DATA_TYPE: Record<CellDataType, CellDataType> = {
  text: "text",
  number: "number",
  dateString: "dateString",
  percentage: "percentage",
};
