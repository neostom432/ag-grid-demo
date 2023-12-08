import { Box, BoxProps, Select as ParteSelect, SelectProps, TextInput, TextInputProps } from "@parte-ds/ui";
import { cloneElement, forwardRef } from "react";
import { css, styled } from "styled-components";

export default function Compounder({ children, ...props }: BoxProps) {
  if (!Array.isArray(children)) {
    throw new Error("Compounder의 children은 최소 2개 이상의 Component으로 구성해야합니다 ");
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-end" {...props}>
      {children.map((comp, index) => {
        if (index === 0)
          return cloneElement(comp, {
            key: index,
            style: { ...(comp?.props?.style ?? {}), borderTopRightRadius: "0px", borderBottomRightRadius: "0px" },
          });
        if (index === children.length - 1) {
          return cloneElement(comp, {
            key: index,
            style: { ...(comp?.props?.style ?? {}), borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginLeft: "-1px" },
          });
        }

        return cloneElement(comp, { key: index, style: { ...(comp?.props?.style ?? {}), borderRadius: "0px", marginLeft: "-1px" } });
      })}
    </Box>
  );
}

/**
 *
 * @param props parte의 Select 컴포넌트의 Props
 * @returns right border radius를 0으로 설정한 Select 컴포넌트
 */
function Select<T, M extends boolean>(props: SelectProps<T, M>) {
  return <ParteSelect {...props} styles={{ control: () => ({ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }) }} />;
}

/**
 *
 * @param props parte의 TextInput 컴포넌트의 Props
 * @returns right border radius를 0으로 설정한 TextInput 컴포넌트
 */
const Input = forwardRef<HTMLInputElement, TextInputProps & { position?: "left" | "right" }>(({ position = "left", ...props }, ref) => {
  return (
    <CustomInputWrapper $position={position}>
      <TextInput {...props} ref={ref} />
    </CustomInputWrapper>
  );
});

Input.displayName = "Input";

const CustomInputWrapper = styled.div<{ $position: "left" | "right" }>`
  ${({ $position }) => css`
    width: fit-content;
    height: fit-content;

    ${$position === "left" &&
    css`
      & div {
        border-radius: 4px 0px 0px 4px;
      }
    `}
    ${$position === "right" &&
    css`
      & div {
        border-radius: 0px 4px 4px 0px;
        margin-left: -1px;
      }
    `}
  `}
`;

Compounder.Input = Input;
Compounder.Select = Select;
