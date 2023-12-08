import { Box, BoxProps, ColorKey } from "@parte-ds/ui";
import { useTheme } from "styled-components";

export type DividerProps = BoxProps & { direction?: "horizontal" | "vertical"; color?: ColorKey };

export default function Divider({ direction = "horizontal", color = "N300", ...rest }: DividerProps) {
  const { colors } = useTheme();
  const width = direction === "horizontal" ? "100%" : 1;
  const height = direction === "horizontal" ? 1 : "100%";

  return <Box backgroundColor={colors[color]} width={width} height={height} flexShrink={0} {...rest} />;
}
