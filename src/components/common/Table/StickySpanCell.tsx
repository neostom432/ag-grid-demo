import { ICellRendererParams } from "ag-grid-community";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const StickyLabel = styled.span`
  position: sticky;
  top: var(--ag-cell-vertical-padding);
  left: 0;
  font-size: 12px;
  font-weight: 400;
  color: var(--ag-header-foreground-color);
  /* 이유는 모르겠는데 높이보다 line-height가 1 높게 설정됨 */
  line-height: calc(var(--ag-internal-calculated-line-height) - 1px);
`;

export default function StickySpanCell({ children, ...params }: PropsWithChildren<ICellRendererParams>) {
  return <StickyLabel>{children || params.value}</StickyLabel>;
}
