import { Box, BoxProps } from "@parte-ds/ui";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<BoxProps>;

export default function Item({ children, ...boxProps }: Props) {
  return (
    <Box paddingTop={8} paddingBottom={8} paddingLeft={16} paddingRight={16} {...boxProps}>
      {children}
    </Box>
  );
}
