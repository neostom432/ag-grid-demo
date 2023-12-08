import { InterfaceSymbolTriangleDownIcon } from "@parte-ds/icons";
import { Paragraph } from "@parte-ds/ui";
import { Cell } from "./Cell";

type Props = {
  value?: string;
  readOnly?: boolean;
};

export default function SelectContainer({ value, readOnly }: Props) {
  return (
    <Cell justifyContent="space-between">
      {value || (
        <Paragraph size={100} color="N600">
          선택
        </Paragraph>
      )}
      {!readOnly && <InterfaceSymbolTriangleDownIcon size={10} color="N600" />}
    </Cell>
  );
}
