import { AlertDangerIcon } from "@parte-ds/icons";
import { Box, Button, Headline, Paragraph } from "@parte-ds/ui";
import { FallbackProps } from "react-error-boundary";
import styled, { css } from "styled-components";

type RuntimeErrorProps = {
  height?: string;
};

const RuntimeError = ({ height = "300px", resetErrorBoundary, error }: RuntimeErrorProps & FallbackProps) => {
  let message = "알 수 없는 오류가 발생했습니다. 루브릭랩스 프론트 팀에게 문의바랍니다";
  if (typeof error === "string") {
    message = error;
  }

  return (
    <Container height={height}>
      <Box display="flex" gap={8} alignItems="center" marginBottom={8}>
        <AlertDangerIcon size={24} color="R400" />
        <Headline size={800} color="R500">
          오류 발생
        </Headline>
      </Box>
      <Paragraph style={{ whiteSpace: "pre" }} size={200}>
        {message}
      </Paragraph>
      <Box marginTop={16} width="280px">
        <Button fullWidth variant="fill-error" onClick={resetErrorBoundary}>
          다시 시도
        </Button>
      </Box>
    </Container>
  );
};
export default RuntimeError;

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
