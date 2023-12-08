import { Box, BoxProps } from "@parte-ds/ui";
import { PropsWithChildren, forwardRef } from "react";
import styled, { css } from "styled-components";

type Props = PropsWithChildren<BoxProps>;

const FooterCell = forwardRef<HTMLDivElement, Props>(({ children, ...rest }, ref) => {
  return (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  );
});

const Container = styled(Box)`
  ${({ theme }) => css`
    ${theme.typography.C100};
    color: ${theme.colors.N700};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;

FooterCell.displayName = "FooterCell";
export default FooterCell;
