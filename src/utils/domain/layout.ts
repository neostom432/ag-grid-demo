import { SIDE_TAB_WIDTH } from "@/constants";
import { clamp } from "../number";

export const getSideTabWidth = (width?: Partial<Record<keyof typeof SIDE_TAB_WIDTH, number>>): Record<keyof typeof SIDE_TAB_WIDTH, number> => {
  const MAX = width?.MAX || SIDE_TAB_WIDTH.MAX;
  const MIN = width?.MIN || SIDE_TAB_WIDTH.MIN;
  const DEFAULT = clamp(width?.DEFAULT || SIDE_TAB_WIDTH.DEFAULT, MIN, MAX);
  return { MIN, MAX, DEFAULT };
};
