import VirtualScroller from "@/components/common/VirtualScroller";
import { Box, BoxProps } from "@parte-ds/ui";

type Props = BoxProps & { width?: number; autoPadding?: boolean; isSideTab?: boolean };

export default function Scrollable({ children, height, autoPadding, isSideTab, ...props }: Props) {
  return (
    <Box display="flex" width="100%" height={height ?? "100%"} flexDirection="column">
      <VirtualScroller {...props} height={height} width="100%">
        {children}
      </VirtualScroller>
    </Box>
  );
}
