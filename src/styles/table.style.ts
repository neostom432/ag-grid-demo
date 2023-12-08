import { CHECKBOX_COL_ID } from "@/constants";
import { CellClassFunc, CellClassRules, HeaderClass } from "ag-grid-community";
import { CSSProperties } from "react";
import { css } from "styled-components";

const BASE_CLASSNAMES = {
  noBorderRight: "no-border-right",
  noBorderBottom: "no-border-bottom",
} as const;

export const HEADER_CLASS = {
  ...BASE_CLASSNAMES,
  number: "header-number-value",
  noBorderRightInGroupHeader: "no-border-right-in-group-header",
} as const;

export const CELL_CLASS_RULES = {
  header: "row-header",
  number: "cell-number-value-rule",
  editable: "cell-editable-rule",
  footer: "footer-rule",
  readonly: "cell-read-only",
} as const;

export const CELL_CLASS = {
  ...BASE_CLASSNAMES,
  number: "cell-number-value",
  editable: "cell-editable",
  uneditable: "cell-uneditable",
  readOnly: "cell-read-only",
  placeholder: "cell-placeholder",
  span: "cell-span",
  rowHeader: "row-header",
  solid: "solid-cell",
  ast: "ast-cell",
  summaryData: "summary-data",
  textCenter: "text-center",
  footer: "footer",
} as const;

export const ROW_CLASS = {
  ...BASE_CLASSNAMES,
  extraSelection: "ag-row-extra-selection",
  extraSelected: "ag-row-extra-selected",
};

export const getTableStyle = css`
  ${({ theme }) => css`
    background-color: ${theme.colors.B100};
  `}
`;

export const gridStyle: CSSProperties = { width: "100%", height: "100%" };
export const baseCellClassRules: CellClassRules = {
  [CELL_CLASS_RULES.number]: (params) => typeof params.value === "number",
  [CELL_CLASS_RULES.editable]: (params) => params.column.isCellEditable(params.node),
  [CELL_CLASS_RULES.header]: (params) => params.colDef.colId !== CHECKBOX_COL_ID && params.column.isPinnedLeft(),
  [CELL_CLASS_RULES.footer]: (params) => params.node.rowPinned === "bottom",
};
export const numberHeaderClass: HeaderClass = () => HEADER_CLASS.number;
export const uneditableCell: CellClassFunc = () => CELL_CLASS.uneditable;
