import { FieldProps } from "@parte-ds/ui";
import { GroupBase, StylesConfig } from "react-select";

export type SelectFieldProps = FieldProps & {
  required?: boolean;
  label?: string;
  description?: string;
  errorText?: string;
  isError?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
};

export const getMenuStyle = <T = string>(minWidth: number | string): StylesConfig<Option<T>> => ({
  option: () => ({ whiteSpace: "nowrap" }),
  menu: () => ({ width: "fit-content", minWidth: typeof minWidth === "string" ? minWidth : `${minWidth}px` }),
  menuList: () => ({ overflowX: "hidden" }),
});

export const getCompoundSelectStyle = <T, M extends boolean, K extends GroupBase<T>>(): StylesConfig<T, M, K> => ({
  control: (base) => ({ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", flex: 1, ":hover": { ...base[":hover"], zIndex: 1 } }),
  container: (_, props) => ({ width: "100%", zIndex: props.isFocused ? 1 : undefined }),
});
