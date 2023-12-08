import { Box, BoxProps } from "@parte-ds/ui";
import styled from "styled-components";

const StickyLabel = styled(Box)`
  position: sticky;
  top: 0;
  left: var(--ag-cell-horizontal-padding);
`;

export default function StickyHeader({ children, ...props }: BoxProps) {
  return <StickyLabel {...props}>{children}</StickyLabel>;
}
