import { Box, ColorKey } from "@parte-ds/ui";
import styled, { css } from "styled-components";

const BorderBox = styled(Box)<{ $borderColor?: ColorKey; borderRadius?: number }>`
  ${({ theme, borderRadius = 4, $borderColor = "N300" }) => css`
    border: 1px solid ${theme.colors[$borderColor]};
    border-radius: ${borderRadius}px;
  `}
`;

export default BorderBox;
