import { ActionMinusIcon, ActionPlusIcon } from "@parte-ds/icons";
import { Box, Button, Checkbox } from "@parte-ds/ui";
import { ChangeEvent, useState } from "react";

type Props<T> = {
  options: Option<T>[];
  column?: number;
  isOptionChecked: (option: Option<T>) => boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, option: Option<T>) => void;
};

const VISIBLE_COUNT = 8;

export default function CheckboxList<T>({ options, column = 1, isOptionChecked, onChange }: Props<T>) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" paddingLeft={16} paddingRight={16}>
      <Box display="grid" gridTemplateColumns={`repeat(${column}, 1fr)`} columnGap={16} width="100%">
        {options
          .filter((_, index) => (collapsed ? index < VISIBLE_COUNT : true))
          .map((option, index) => (
            <Box paddingTop={8} paddingBottom={8} key={`${option.label}-${index}`}>
              <Checkbox label={option.label} checked={isOptionChecked(option)} onChange={(e) => onChange(e, option)} />
            </Box>
          ))}
      </Box>
      {options.length > VISIBLE_COUNT &&
        (collapsed ? (
          <Button leadingIcon={<ActionPlusIcon />} type="button" variant="text-primary" onClick={() => setCollapsed(false)}>
            더보기
          </Button>
        ) : (
          <Button leadingIcon={<ActionMinusIcon />} type="button" variant="text-primary" onClick={() => setCollapsed(true)}>
            닫기
          </Button>
        ))}
    </Box>
  );
}
