import { ColDef, ColGroupDef } from "ag-grid-community";

declare global {
  type SpanRow = {
    id: string;
    span: number;
  };

  type CellDataType = "text" | "number" | "dateString" | "percentage";
  type DataTableData<T> = ColDef<T> | ColGroupDef<T>;

  type SpanRowData = Record<string, SpanRow>;

  type UnfoldIconPosition = "left" | "right";

  // 어떤 index에 몇개의 숨겨진 컬럼을 저장하기 위한 Map 형태의 데이터
  // 이렇게 하면 숨김 처리할때도 쉽게 병합/추가 할 수 있고
  // 펼침 처리할때도 해당 인덱스 오른쪽에 id를 찾아서 추가 시켜버리면 되니 편하다.
  type HiddenColIdsMap = Record<number, string[]>;
  type HideColumnsParams = {
    unfoldIconIndex: number;
    hiddenCols: { colId: string; visibleIndex: number }[];
  };
  type ShowColumnParams = { unfoldIconIndex: number; hiddenColIds: string[] };
}
