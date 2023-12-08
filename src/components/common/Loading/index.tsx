import { Box } from "@parte-ds/ui";
import styled, { css } from "styled-components";

export type LoadingProps = {
  columnCnt?: number;
};

const Loading = ({ columnCnt }: LoadingProps) => {
  return (
    <Container>
      <Box width={120}>
        <Title />
      </Box>
      <Body>
        {Array.from({ length: 16 }).map((_, index) => (
          <Row key={index}>
            {Array.from({ length: columnCnt ?? 5 }).map((_, index) => (
              <Cell key={index} />
            ))}
          </Row>
        ))}
      </Body>
    </Container>
  );
};
export default Loading;

const SkeletonAnimation = css`
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  row-gap: 16px;
  padding: 16px;
  overflow-y: hidden;
`;
const Title = styled.div`
  height: 24px;
  ${SkeletonAnimation}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Row = styled(Box)`
  width: 100%;
  height: 36px;

  display: flex;
  column-gap: 8px;
`;
const Cell = styled(Box)`
  ${SkeletonAnimation}
  flex: 1;
`;
