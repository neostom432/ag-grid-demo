import { Box, BoxProps } from "@parte-ds/ui";

export const Cell = ({ children, ...props }: BoxProps) => {
  return (
    <Box display="flex" alignItems="center" width="100%" height="100%" {...props}>
      {children}
    </Box>
  );
};
