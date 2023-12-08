import { AlertWarningIcon } from "@parte-ds/icons";
import { Box, Headline, Link as ParteLink } from "@parte-ds/ui";
import Link from "next/link";
import styled from "styled-components";

const Custom404 = () => {
  return (
    <Wrapper>
      <Container>
        <Box display="inline-flex" alignItems="center" gap={8}>
          <AlertWarningIcon size={28} color="Y400" />
          <Headline size={800} color="N800">
            요청하신 페이지를 찾을 수 없습니다.
          </Headline>
        </Box>

        <Link href="/" passHref legacyBehavior>
          <ParteLink>홈으로 돌아가기</ParteLink>
        </Link>
      </Container>
    </Wrapper>
  );
};
export default Custom404;

const Wrapper = styled(Box)`
  width: inherit;
  height: inherit;
`;
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 16px;
  width: fit-content;
  height: 100%;
  margin: auto;
`;
