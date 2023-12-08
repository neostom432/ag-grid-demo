import { CELL_DATA_TYPE, CHECKBOX_COL_ID, HEADER_HEIGHT } from "@/constants";
import { ROW_CLASS, baseCellClassRules, gridStyle } from "@/styles";
import { baseFilterComparator, clearGrid, cn, formatStrPrice, formatTableSigan, getMainMenuItems, priceToNumber } from "@/utils";
import { toPercentage } from "@/utils/formatter";
import { Spinner } from "@parte-ds/ui";
import { ColDef, DataTypeDefinition, GridApi, GridReadyEvent, ISetFilterParams, RowClassParams, SideBarDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ForwardedRef, forwardRef, useEffect, useMemo, useRef } from "react";
import { match } from "ts-pattern";
import Empty from "../Empty";
type TableType = "list" | "data";

export type DataTableProps = AgGridReactProps & {
  type?: TableType;
  hideScroll?: boolean;
  hideHeaderBorderBottom?: boolean;
  clickable?: boolean;
  needQueryText?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyText?: string;
  unsetMinHeight?: boolean;
  extraSelection?: boolean;
  extraSelectedRowId?: string;
  enableSideFilter?: boolean;
};

function Table(
  {
    type = "data",
    hideScroll,
    clickable,
    needQueryText,
    emptyText,
    onGridReady: onGridReadyProp,
    hideHeaderBorderBottom,
    isLoading,
    isEmpty,
    unsetMinHeight,
    enableSideFilter = false,
    rowHeight: rowHeightProps,
    headerHeight: headerHeightProps,
    defaultColDef: defaultColDefProps,
    ...props
  }: DataTableProps,
  gridRef: ForwardedRef<AgGridReact>
) {
  const gridApi = useRef<GridApi>();

  const onGridReady = (e: GridReadyEvent) => {
    onGridReadyProp?.(e);
    gridApi.current = e.api;
    if (!props.rowData) e.api.showNoRowsOverlay();
  };

  const dataTypeDefinitions = useMemo<Record<string, DataTypeDefinition>>(() => {
    return {
      [CELL_DATA_TYPE.number]: {
        extendsDataType: "number",
        baseDataType: "number",
        valueParser: (params) => (Number.isNaN(priceToNumber(params?.newValue, true)) ? 0 : Number(priceToNumber(params.newValue))),
        valueFormatter: (params) => formatStrPrice(params?.value ?? undefined),
      },
      [CELL_DATA_TYPE.text]: {
        extendsDataType: "text",
        baseDataType: "text",
        valueFormatter: (params) => (params.colDef?.colId !== CHECKBOX_COL_ID ? params.value ?? "-" : ""),
      },
      [CELL_DATA_TYPE.percentage]: {
        extendsDataType: "number",
        baseDataType: "number",
        valueFormatter: (params) => toPercentage(params?.value ?? 0),
      },
      [CELL_DATA_TYPE.dateString]: {
        baseDataType: "text",
        extendsDataType: "text",
        valueParser: (params) => {
          if (params?.newValue == null) {
            return null;
          }
          return formatTableSigan(params?.newValue);
        },
        valueFormatter: (params) => {
          return formatTableSigan(params?.value);
        },
      },
    };
  }, []);

  useEffect(() => {
    if (gridApi.current) {
      const api = gridApi.current;
      if (isLoading || isEmpty) {
        api.setFilterModel(null);
        api.showNoRowsOverlay();
      } else {
        api.hideOverlay();
      }
    }
  }, [isLoading, isEmpty]);

  useEffect(() => {
    return () => {
      gridApi.current && clearGrid(gridApi.current);
    };
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      cellClassRules: baseCellClassRules,
      editable: false,
      filter: true,
      cellDataType: CELL_DATA_TYPE.text,
      resizable: true,
      sortable: true,
      ...defaultColDefProps,
      filterParams: {
        comparator: baseFilterComparator,
        showTooltips: true,
        keyCreator: (params) => {
          if (params?.colDef?.cellDataType === CELL_DATA_TYPE.dateString) {
            return formatTableSigan(params.value);
          }
          return params.value;
        },
        valueFormatter: (params) => {
          if (params?.colDef?.cellDataType === CELL_DATA_TYPE.percentage) {
            return toPercentage(params.value);
          }
          if (params?.colDef?.cellDataType === CELL_DATA_TYPE.dateString) {
            return formatTableSigan(params.value);
          }
          if (params?.colDef?.cellDataType === CELL_DATA_TYPE.number || typeof params.value === "number") {
            return formatStrPrice(params.value);
          }
          return params.value;
        },
        treeList: false,
        ...defaultColDefProps?.filterParams,
      } as ISetFilterParams,
    }),
    [defaultColDefProps]
  );

  const getRowClass = useMemo(() => {
    return (params: RowClassParams) => {
      const classNames: string[] = [];
      const propsRowClassNames = props.getRowClass?.(params);
      if (propsRowClassNames) {
        switch (typeof propsRowClassNames) {
          case "string":
            classNames.push(propsRowClassNames);
            break;
          case "object":
            classNames.push(...propsRowClassNames);
            break;
          default:
            break;
        }
      }
      if (props.extraSelection) classNames.push(ROW_CLASS.extraSelection);
      if (props.extraSelectedRowId === params.node.id) classNames.push(ROW_CLASS.extraSelected);
      return classNames;
    };
  }, [props.getRowClass, props.extraSelection, props.extraSelectedRowId]);

  const lastExtraSelectedRowId = useRef("");
  useEffect(() => {
    const api = gridApi.current;
    if (api && props.extraSelectedRowId) {
      const lastExtraSelectedNode = api.getRowNode(lastExtraSelectedRowId.current);
      const targetNode = api.getRowNode(props.extraSelectedRowId);
      if (targetNode) {
        api.redrawRows({ rowNodes: [targetNode] });
        lastExtraSelectedRowId.current = props.extraSelectedRowId;
      }
      if (lastExtraSelectedNode) api.redrawRows({ rowNodes: [lastExtraSelectedNode] });
    }
  }, [props.extraSelectedRowId]);

  const sideBar = useMemo(() => {
    if (enableSideFilter === false) return null;
    return {
      toolPanels: [
        {
          id: "filters",
          labelDefault: "필터",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          minWidth: 180,
          maxWidth: 360,
          width: 210,
          toolPanelParams: {
            suppressSyncLayoutWithGrid: true,
          },
        },
      ],
      position: "left",
      defaultToolPanel: "filters",
      hiddenByDefault: true,
    } as SideBarDef;
  }, [enableSideFilter]);

  const columnDefs = useMemo(() => {
    if (!props.columnDefs) return undefined;
    return [
      ...props.columnDefs,
      {
        headerName: "",
        flex: 1,
        cellDataType: "",
        suppressFiltersToolPanel: true,
        suppressMenu: true,
        suppressColumnsToolPanel: true,
        suppressSpanHeaderHeight: false,
        sortable: false,
        filter: false,
        lockPosition: "right",
        resizable: false,
        colId: "last-blank",
        enableRowGroup: false,
      } as ColDef,
    ];
  }, [props.columnDefs]);

  const rowHeight = useMemo(() => {
    if (typeof rowHeightProps === "number") return rowHeightProps;
    return type === "data" ? 24 : 48;
  }, [rowHeightProps]);

  const headerHeight = useMemo(() => {
    if (typeof headerHeightProps === "number") return headerHeightProps;
    return HEADER_HEIGHT;
  }, [headerHeightProps]);

  return (
    <div
      style={gridStyle}
      className={cn(
        `ag-theme-serp`,
        type === "list" && "ag-theme-serp-list",
        hideScroll && "hide-scroll",
        clickable && "clickable",
        hideHeaderBorderBottom && "hide-header-border-bottom",
        unsetMinHeight && "unset-min-height"
      )}
    >
      <AgGridReact
        {...props}
        sideBar={sideBar}
        ref={gridRef}
        suppressRowHoverHighlight={!clickable}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        noRowsOverlayComponentParams={{ needQueryText, isLoading, isEmpty, emptyText }}
        noRowsOverlayComponent={NoRowsOverlay}
        suppressLoadingOverlay
        getMainMenuItems={getMainMenuItems}
        enableRangeSelection
        enableRangeHandle
        enterNavigatesVerticallyAfterEdit
        stopEditingWhenCellsLoseFocus
        getRowClass={getRowClass}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={defaultColDef}
        suppressDragLeaveHidesColumns
        onGridReady={onGridReady}
        dataTypeDefinitions={dataTypeDefinitions}
        singleClickEdit
        tooltipInteraction={true}
        autoSizeStrategy={{
          type: "fitCellContents",
        }}
      />
    </div>
  );
}

export default forwardRef<AgGridReact, DataTableProps>(Table);

export const NoRowsOverlay = (props: { needQueryText?: string; isLoading?: boolean; isEmpty?: boolean; emptyText?: string }) =>
  match(props)
    .with({ isEmpty: true }, ({ emptyText }) => <Empty emptyText={emptyText || "조회된 데이터가 없습니다."} hideEmptySvg />)
    .with({ isLoading: true }, () => <Spinner size={48} />)
    .otherwise(({ needQueryText }) => <Empty emptyText={needQueryText || "조회조건을 설정해주세요."} hideEmptySvg />);
