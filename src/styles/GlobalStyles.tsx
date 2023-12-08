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
      /* {FIXME: 인풋 스피너 수정} */
      body {
        color: ${({ theme }) => theme.colors.N900};
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: auto;
        }
        input[type="number"] {
          -moz-appearance: auto;
        }
      }
`;

export default GlobalStyles;
