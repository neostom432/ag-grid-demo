import { Box, BoxProps } from "@parte-ds/ui";

type Props = BoxProps;

export default function Table({ children, ...props }: Props) {
  return (
    <Box {...props} style={{ minHeight: 0, ...props.style }} display="flex" flex={props.width ? "none" : "1"}>
      {children}
    </Box>
  );
}
