import { STORED_VALUE } from "@/constants";
import { storedValueSchema } from "@/schema/localStorage";
import { isServer } from "@tanstack/react-query";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/function";

export const getStoredValue = () => {
  let storedValue: StoredValue | null = null;
  if (isServer) return storedValue;
  const stringifiedStoredValue = localStorage.getItem(STORED_VALUE);

  if (stringifiedStoredValue) {
    const result = storedValueSchema.safeParse(JSON.parse(stringifiedStoredValue));
    if (result.success) storedValue = result.data;
  }

  return storedValue;
};

export const setStoredValue = (values: unknown) => {
  const storedValue = getStoredValue();
  let newStoredValue = storedValue;
  if (values) {
    const result = storedValueSchema.safeParse(values);
    if (result.success) {
      const falsyValueExcluded: StoredValue = pipe(
        result.data,
        R.filter((value) => {
          if (value === null) return false;
          if (typeof value === "string") return !!value;
          if (Array.isArray(value)) return value.length > 0;
          return true;
        })
      );
      newStoredValue = { ...newStoredValue, ...falsyValueExcluded };
    }
  }

  localStorage.setItem(STORED_VALUE, JSON.stringify(newStoredValue));
};
