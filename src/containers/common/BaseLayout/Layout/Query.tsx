import { Box, BoxProps, ColorKey } from "@parte-ds/ui";
import styled, { useTheme } from "styled-components";

type Props = BoxProps & { borderColor?: ColorKey };

export default function Query({ children, borderColor = "N400", ...props }: Props) {
  const { colors } = useTheme();

  return (
    <QueryContainer
      paddingTop={16}
      paddingBottom={16}
      $borderColor={colors[borderColor]}
      rowGap={16}
      columnGap={8}
      display="flex"
      flexWrap="wrap"
      alignItems="flex-start"
      {...props}
    >
      {children}
    </QueryContainer>
  );
}

const QueryContainer = styled(Box)<{ $borderColor: string }>`
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
`;
