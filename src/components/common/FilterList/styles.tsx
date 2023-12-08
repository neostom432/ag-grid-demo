import { Box } from "@parte-ds/ui";
import styled, { css } from "styled-components";

export const Container = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colors.N300};
    border-radius: 8px;
    min-height: 0;
    flex-shrink: 0;
  `}
`;

export const TitleContainer = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    column-gap: 8px;
    align-items: center;
    padding: 16px;
    height: 50px;
    border-bottom: 1px solid ${theme.colors.N300};
  `}
`;

export const Title = styled.p`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.N900};
    flex: 1;
  `}
`;

export const Content = styled(Box)`
  ${({ theme }) => css`
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 10px 0;
    & > div:not(:last-child)::after {
      content: "";
      background-color: ${theme.colors.N300};
      width: calc(100% - 16px - 16px); // 전체 너비에서 좌우패딩값 빼기
      margin-top: 10px;
      display: flex;
      align-self: center;
      height: 1px;
    }
  `}
`;
