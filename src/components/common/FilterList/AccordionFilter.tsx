import { InterfaceChevronDownIcon, InterfaceChevronUpIcon } from "@parte-ds/icons";
import { Badge, Box, Headline } from "@parte-ds/ui";
import styled, { css } from "styled-components";

import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{ title: string; count?: number }>;

export default function AccordionFilter({ title, children, count = 0 }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box display="flex" flexDirection="column">
      <Container onClick={() => setIsOpen((prev) => !prev)}>
        <Headline size={400} color="N800">
          {title}
        </Headline>
        <Box display="flex" gap={8}>
          {!isOpen && <Badge text={`${count}`} badgeColor="GREEN" type="pills" />}
          {isOpen ? <InterfaceChevronUpIcon /> : <InterfaceChevronDownIcon />}
        </Box>
      </Container>
      {isOpen && children}
    </Box>
  );
}

export const Container = styled(Box)`
  ${() => css`
    display: flex;
    justify-content: space-between;
    column-gap: 8px;
    padding: 12px 16px;
    cursor: pointer;
  `}
`;
