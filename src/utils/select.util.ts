import { Option } from "@parte-ds/ui";
import { MultiValue, SingleValue } from "react-select";

export const parseOption = <T>(option: MultiValue<Option<T>> | SingleValue<Option<T>>) => {
  if (Array.isArray(option)) {
    throw new Error("Option must be single");
  }
  return option as SingleValue<Option<T>>;
};

export const parseMultiOption = <T>(option: MultiValue<Option<T>> | SingleValue<Option<T>>) => {
  if (!Array.isArray(option)) {
    throw new Error("Option must be an array");
  }
  return option as MultiValue<Option<T>>;
};

export const getOptionValue = <T>(option: Option<T>) => option.value;

export const makeOption = <T extends { toString: () => string }>(value: T) => ({ value, label: value.toString() });
export const makeOptionW = <T>(value: T, labelPredicate: (value: T) => string) => ({ value, label: labelPredicate(value) });

export const multiOptionsToValues = <T>(options: MultiValue<Option<T>>) => options.map(getOptionValue);
