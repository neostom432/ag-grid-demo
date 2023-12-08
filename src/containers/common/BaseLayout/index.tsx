import { Box } from "@parte-ds/ui";
import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = PropsWithChildren;

export default function BaseLayout({ children }: Props) {
  return (
    <Wrapper>
      <Box display="flex" width="100%" height="100%">
        <Box display="flex" flexDirection="column" height="100%" flex="1" minWidth="0px">
          {children}
        </Box>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Box)`
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  display: flex;
`;
