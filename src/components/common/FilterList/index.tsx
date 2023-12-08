import { Box, BoxProps, Button } from "@parte-ds/ui";
import { PropsWithChildren } from "react";
import AccordionFilter from "./AccordionFilter";
import CheckboxList from "./CheckboxList";
import Item from "./Item";
import SolidFilter from "./SolidFilter";
import * as Styled from "./styles";

type Props = PropsWithChildren<BoxProps & { onReset: () => void; onChangeOption: () => void }>;

export default function FilterList({ children, onReset, onChangeOption, ...rest }: Props) {
  return (
    <Styled.Container {...rest}>
      <Styled.TitleContainer>
        <Styled.Title>필터</Styled.Title>
        <Box display="flex" flexDirection="row" gap={10}>
          <Button variant="text-primary" type="button" onClick={onReset}>
            초기화
          </Button>
        </Box>
      </Styled.TitleContainer>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
}

FilterList.AccordionFilter = AccordionFilter;
FilterList.SolidFilter = SolidFilter;
FilterList.CheckboxList = CheckboxList;
FilterList.Item = Item;
