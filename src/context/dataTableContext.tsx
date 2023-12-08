import { getKeys } from "@/utils/domain/dataTable";
import { ACENDING, DESCENDING, isInRange } from "@/utils/number";
import { produce } from "immer";
import { Dispatch, PropsWithChildren, Reducer, createContext, useReducer } from "react";

type DataTableState = {
  selectedColIds: string[];
  hiddenColIdsMap: HiddenColIdsMap;
  focusedColIds: string[];
  focusedRowIds: string[];
  isDragging: boolean;
};

type SelectColumns = { type: "select_columns"; colIds: string[] };
type ClearColumns = { type: "clear_columns" };
type HideColumns = { type: "hide_columns"; hideColumnsParams: HideColumnsParams };
type ShowAllColumns = { type: "show_all_columns" };
type ShowColumns = { type: "show_columns"; unfoldIconIndex: number };
type ShiftIconIndex = { type: "shift_icon_index"; fromIndex: number; toIndex: number };
type FocusColIds = { type: "focus_col_ids"; colIds: string[] };
type FocusRowIds = { type: "focus_row_ids"; rowIds: string[] };
type SetIsDragging = { type: "set_is_dragging"; isDragging: boolean };

type DataTableAction = SelectColumns | ClearColumns | HideColumns | ShowAllColumns | ShowColumns | ShiftIconIndex | FocusColIds | FocusRowIds | SetIsDragging;

const DataTableReducer: Reducer<DataTableState, DataTableAction> = produce((draft, action) => {
  let mergedIds: string[] = [];
  let currentVisibleIndex: number;
  let hiddenColCount = 0;
  let revealColCount = 0;
  let shiftDrirection: "toLeft" | "toRight";
  switch (action.type) {
    case "select_columns":
      draft.selectedColIds = action.colIds;
      break;
    case "clear_columns":
      draft.selectedColIds = [];
      break;
    // HideColumnsParams의 형태를 보면 아이콘이 보일 unfoldIconIndex,
    // 그리고 숨김처리할 col의 visibleIndex(보이는 컬럼 집합에서의 index)와 colId가 포함된 배열을 받고 있다.
    // 왜냐하면 해당 unfoldIconIndex에 hiddenCols를 단순 추가하는게 아니라
    // 추가하기 전에 숨김 처리할 column에도 이미 숨김 처리된 다른 col들이 있을 수 있기 때문에
    // 항상 추가하기전에 병합 처리 과정이 필요하다.
    // 그리고 마지막으로 숨김 처리된 col 개수만큼 해당 unfoldIconIndex 보다 오른쪽에 있던 index들을 왼쪽으로 땡겨줘야한다.
    case "hide_columns":
      currentVisibleIndex = action.hideColumnsParams.unfoldIconIndex;
      // 병합단계
      mergedIds = action.hideColumnsParams.hiddenCols.reduce((acc, { visibleIndex, colId }) => {
        const result = [...acc, colId];
        const maybeIds = draft.hiddenColIdsMap[visibleIndex];
        if (maybeIds) {
          result.push(...maybeIds);
          delete draft.hiddenColIdsMap[visibleIndex];
        }
        return result;
      }, [] as string[]);

      // 추가 단계
      if (draft.hiddenColIdsMap[currentVisibleIndex]) {
        draft.hiddenColIdsMap[currentVisibleIndex].push(...mergedIds);
      } else {
        draft.hiddenColIdsMap[currentVisibleIndex] = mergedIds;
      }

      // 순서 조정 단계
      hiddenColCount = action.hideColumnsParams.hiddenCols.length;
      getKeys(draft.hiddenColIdsMap).forEach((key) => {
        if (key > currentVisibleIndex) {
          draft.hiddenColIdsMap[key - hiddenColCount] = draft.hiddenColIdsMap[key];
          delete draft.hiddenColIdsMap[key];
        }
      });
      draft.selectedColIds = [];
      break;

    case "show_all_columns":
      draft.hiddenColIdsMap = [];
      break;
    // 2, 4, 6에 아이콘이 위치해있고 각각 2개씩 column들이 숨겨져있다고 했을때
    // 4의 아이콘을 눌러서 펼쳤다면 4보다 이후에 위치한 아이콘의 위치를
    // 4에 숨겨진 col수만큼 뒤로 밀어야한다.
    case "show_columns":
      currentVisibleIndex = action.unfoldIconIndex;
      if (!draft.hiddenColIdsMap[currentVisibleIndex]) return;

      revealColCount = draft.hiddenColIdsMap[currentVisibleIndex].length;
      delete draft.hiddenColIdsMap[currentVisibleIndex];

      getKeys(draft.hiddenColIdsMap).forEach((key) => {
        if (key > currentVisibleIndex) {
          draft.hiddenColIdsMap[key + revealColCount] = draft.hiddenColIdsMap[key];
          delete draft.hiddenColIdsMap[key];
        }
      });
      break;
    // 만약 아이콘 위치가 3,4에 있고 각각 2개씩 col이 숨겨져있다고 해보자.
    // 그렇다면 4번째 col에는 양옆에 아이콘이 존재한다.
    // 이때 4번째 col을 다른곳으로 이동시키면 숨겨진 컬럼들이 합쳐진다. (엑셀에서 확인 가능)
    // 2가지의 일을 해줘야 하는데,
    // 1. fromIndex, toIndex 두 가지 변수를 보고 해당 범위 안의 아이콘 index를 앞으로 땡기거나 뒤로 밀어야한다.
    // 2. 그 index를 +-1 해주는 과정에서 변경된 index에 이미 존재하는 아이콘 index가 있으면
    //    그 숨겨진 col 배열 앞쪽(뒤로 밀었을 경우) 혹은 뒤쪽(앞으로 땡겼을경우)에 옮겨진 아이콘의 숨겨진 col들을 합쳐줘야 한다.
    case "shift_icon_index":
      shiftDrirection = action.fromIndex > action.toIndex ? "toLeft" : "toRight";
      getKeys(draft.hiddenColIdsMap)
        // 왼쪽으로 컬럼을 옮기면 from, to 범위안의 index를 +1 해줘서 밀어야하는데 그 과정에서 자기들끼리 겹치면 안되니 큰 index부터 처리
        // 오른쪽으로 컬럼을 옮기면 -1를 해줘서 땡겨줘야 하므로 작은 index부터 처리
        .sort(shiftDrirection === "toLeft" ? DESCENDING : ACENDING)
        .forEach((key) => {
          if (isInRange([action.fromIndex, action.toIndex], key, [true, false])) {
            const changedIndex = key + (shiftDrirection === "toLeft" ? 1 : -1);
            // merge
            if (draft.hiddenColIdsMap[changedIndex]) {
              shiftDrirection === "toLeft"
                ? draft.hiddenColIdsMap[changedIndex].unshift(...draft.hiddenColIdsMap[key])
                : draft.hiddenColIdsMap[changedIndex].push(...draft.hiddenColIdsMap[key]);
            } else {
              draft.hiddenColIdsMap[changedIndex] = draft.hiddenColIdsMap[key];
            }
            delete draft.hiddenColIdsMap[key];
          }
        });

      break;
    case "focus_col_ids":
      draft.focusedColIds = action.colIds;
      break;
    case "focus_row_ids":
      draft.focusedRowIds = action.rowIds;
      break;
    case "set_is_dragging":
      draft.isDragging = action.isDragging;
      break;
  }
});

export const DataTableContext = createContext<[DataTableState, Dispatch<DataTableAction>] | null>(null);
export const DataTableProvider = ({ children }: PropsWithChildren) => {
  const stateAndDispatch = useReducer(DataTableReducer, {
    selectedColIds: [],
    hiddenColIdsMap: {},
    focusedColIds: [],
    focusedRowIds: [],
    isDragging: false,
  });

  return <DataTableContext.Provider value={stateAndDispatch}>{children}</DataTableContext.Provider>;
};
