import "styled-components";
import { ParteTheme } from "@parte-ds/ui";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ParteTheme {}
}
