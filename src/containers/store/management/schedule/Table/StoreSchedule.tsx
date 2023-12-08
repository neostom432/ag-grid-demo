import Table from "@/components/common/Table";
import { CHECKBOX_COL_ID } from "@/constants";
import { GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

type Props = {
  data?: StoreSchedule[];
  isLoading: boolean;
  extraSelectedRowId?: string;
  onGridReady: (event: GridReadyEvent) => void;
};

export default function StoreScheduleTable({ data, isLoading, onGridReady }: Props) {
  const gridRef = useRef<AgGridReact<StoreSchedule>>(null);

  const columnDefs = useMemo<DataTableData<StoreSchedule>[]>(
    () => [
      {
        colId: CHECKBOX_COL_ID,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 40,
        suppressSpanHeaderHeight: false,
        suppressMenu: true,
        filter: false,
      },
      {
        headerName: "매장코드",
        field: "shopCd",
        width: 120,
      },
      {
        headerName: "매장명",
        field: "shopNm",
        width: 160,
      },
      {
        headerName: "일정 타이틀",
        field: "tit",
        width: 240,
      },
    ],
    []
  );

  return (
    <Table
      type="list"
      ref={gridRef}
      columnDefs={columnDefs}
      rowData={data}
      getRowId={(params) => params.data.shopCd}
      clickable
      isLoading={isLoading}
      isEmpty={data?.length === 0}
      rowSelection="multiple"
      onGridReady={onGridReady}
      extraSelection
      suppressRowClickSelection
    />
  );
}
