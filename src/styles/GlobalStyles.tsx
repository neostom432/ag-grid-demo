import { styleReset } from "@parte-ds/ui";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
      ${styleReset}
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      #__next {
        width: 100vw;
        height: 100vh;
      }
`;

export default GlobalStyles;
