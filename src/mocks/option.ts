import { Option } from "@parte-ds/ui";

export type RTShopSideType = "rt" | "wild-card";

export const RT_OPTIONS: Option<RTShopSideType>[] = [
  {
    label: "완불 자동 RT",
    value: "rt",
  },
  {
    label: "물동 단계 와일드카드",
    value: "wild-card",
  },
];

export const INCLUDE_UNSHIPPED_SHOP: Option<boolean>[] = [
  {
    label: "미출고 매장 포함",
    value: true,
  },
  {
    label: "미출고 매장 미포함",
    value: false,
  },
];
