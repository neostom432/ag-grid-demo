import { StyleInfoIcon } from "@parte-ds/icons";
import { Box, Headline, Tooltip } from "@parte-ds/ui";

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ title?: string; info?: string }>;

export default function SolidFilter({ title, children, info }: Props) {
  return (
    <Box display="flex" flexDirection="column">
      {(title || info) && (
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={8} paddingTop={12} paddingBottom={12} paddingLeft={16} paddingRight={16}>
          {title && (
            <Headline size={400} color="N800">
              {title}
            </Headline>
          )}
          {info && (
            <Tooltip content={info} position="TOP">
              <StyleInfoIcon color="N600" />
            </Tooltip>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
}
