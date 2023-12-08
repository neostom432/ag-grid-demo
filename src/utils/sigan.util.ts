import { NullableSiganRange } from "@/schema";
import dayjs from "dayjs";
import { Sigan, sigan } from "./sigan";

export const addWeekPaddingToRange = (start: Sigan, end: Sigan) => {
  const newStart = start.startOf("isoWeek");
  const newEnd = end.endOf("isoWeek");

  return [newStart, newEnd];
};

export const getSiganListBetweenRange = (start: Sigan, end: Sigan, unit: dayjs.ManipulateType) => {
  const diff = end.diff(start, unit);

  return Array.from({ length: diff + 1 }, (_, i) => start.add(i, unit));
};

export const strDateRangeToSiganRange = (range?: (string | null)[]) => {
  if (!range) return undefined;
  const startDate = range[0];
  const endDate = range[1];
  return [startDate ? sigan(startDate) : null, endDate ? sigan(endDate) : null] as NullableSiganRange;
};

export const siganRangeToStrDateRange = (range?: NullableSiganRange) => {
  if (!range) return undefined;
  const startDate = range[0];
  const endDate = range[1];
  return [startDate ? startDate.format() : null, endDate ? endDate.format() : null] as (string | null)[];
};
