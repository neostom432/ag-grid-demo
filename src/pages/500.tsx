import { AlertDangerIcon } from "@parte-ds/icons";
import { Box, Button, Headline } from "@parte-ds/ui";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Custom500() {
  const router = useRouter();

  const handleClick = () => {
    window.location.href = router.pathname;
  };

  return (
    <Wrapper>
      <Container>
        <Box display="inline-flex" alignItems="center" gap={8}>
          <AlertDangerIcon size={28} color="R400" />
          <Headline size={800} color="N800">
            요청이 실패했습니다. 잠시 후 시도해주세요.
          </Headline>
        </Box>
        <Button variant="outline-secondary" onClick={handleClick}>
          다시 시도하기
        </Button>
      </Container>
    </Wrapper>
  );
}
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
