type FilterOption<T> = Option<T> & {
  type: string;
};

export const 매장: FilterOption<string>[] = [
  {
    label: "현대충청",
    value: "10079",
    type: "매장",
  },
  {
    label: "현대울산동구",
    value: "10080",
    type: "매장",
  },
  {
    label: "신세계경기",
    value: "10081",
    type: "매장",
  },
  {
    label: "롯데안산",
    value: "10082",
    type: "매장",
  },
];

export const 시즌: FilterOption<string>[] = [
  {
    label: "22F",
    value: "20001",
    type: "시즌",
  },
  {
    label: "22S",
    value: "20002",
    type: "시즌",
  },
  {
    label: "22N",
    value: "20003",
    type: "시즌",
  },
];

export const 대분류: FilterOption<string>[] = [
  {
    label: "의류",
    value: "30001",
    type: "대분류",
  },
  {
    label: "ACC",
    value: "30002",
    type: "대분류",
  },
];

export const 중분류: FilterOption<string>[] = [
  {
    label: "Bag",
    value: "40001",
    type: "중분류",
  },
  {
    label: "Headwear",
    value: "40002",
    type: "중분류",
  },
  {
    label: "Shoes",
    value: "40003",
    type: "중분류",
  },
  {
    label: "Acc_Etc",
    value: "40004",
    type: "중분류",
  },
  {
    label: "Bottom",
    value: "40005",
    type: "중분류",
  },
];

export const 아이템: FilterOption<string>[] = [
  {
    label: "BM(버킷팩)",
    value: "50001",
    type: "아이템",
  },
  {
    label: "BN(비니)",
    value: "50002",
    type: "아이템",
  },
  {
    label: "BQ(숄더백)",
    value: "50003",
    type: "아이템",
  },
  {
    label: "BS(야구복)",
    value: "50004",
    type: "아이템",
  },
  {
    label: "CB(여성 베레모)",
    value: "50005",
    type: "아이템",
  },
];

export const 계절: FilterOption<string>[] = [
  {
    label: "Spring",
    value: "10079",
    type: "계절",
  },
  {
    label: "Pre-Summer",
    value: "10080",
    type: "계절",
  },
  {
    label: "Summer",
    value: "10081",
    type: "계절",
  },
  {
    label: "Fall",
    value: "10082",
    type: "계절",
  },
  {
    label: "Winter",
    value: "10082",
    type: "계절",
  },
];
