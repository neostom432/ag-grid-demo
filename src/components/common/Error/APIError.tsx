import { AlertDangerIcon } from "@parte-ds/icons";
import { Box, Button, Headline, Paragraph } from "@parte-ds/ui";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { FallbackProps } from "react-error-boundary";
import styled, { css } from "styled-components";

type APIErrorProps = {
  height?: string;
};

const APIError = ({ height = "300px", resetErrorBoundary, error }: APIErrorProps & FallbackProps) => {
  let apiError: APIError | undefined;
  if (error instanceof AxiosError) {
    apiError = error.response?.data;
  }

  let errorView: ReactNode = null;
  if (apiError) {
    const { error, errorCode, message, path } = apiError;
    errorView = (
      <>
        {error && <Paragraph size={200}>error: {error}</Paragraph>}
        {errorCode && <Paragraph size={200}>errorCode: {errorCode}</Paragraph>}
        {message && <Paragraph size={200}>message: {message}</Paragraph>}
        {path && <Paragraph size={200}>path: {path}</Paragraph>}
      </>
    );
  }

  return (
    <Container height={height}>
      <Box display="flex" gap={8} alignItems="center" marginBottom={8}>
        <AlertDangerIcon size={24} color="N700" />
        <Headline size={800} color="N800">
          잠시 후 다시 시도해주세요
        </Headline>
      </Box>
      {errorView || "오류가 발생했습니다"}
      <Box marginTop={16} width="280px">
        <Button fullWidth variant="outline-primary" onClick={resetErrorBoundary}>
          다시 시도
        </Button>
      </Box>
    </Container>
  );
};
export default APIError;

const Container = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid ${theme.colors.N200};
    border-radius: 4px;
    ${theme.elevation.elevation0}
    padding: 16px;
    width: 100%;
  `}
`;
