import { Box, BoxProps } from "@parte-ds/ui";
import styled from "styled-components";

type Props = BoxProps & { autoPadding?: boolean; isSideTab?: boolean };

export default function FullHeight({ children, autoPadding, isSideTab, ...props }: Props) {
  return <StyledFullHeight {...props}>{children}</StyledFullHeight>;
}

const StyledFullHeight = styled(Box)`
  display: flex;
  height: inherit;
  min-height: 0;
  box-sizing: border-box;
`;
