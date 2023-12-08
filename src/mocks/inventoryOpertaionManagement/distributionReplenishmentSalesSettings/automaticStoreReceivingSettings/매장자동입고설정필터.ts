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

export const AP: FilterOption<string>[] = [
  {
    label: "백대직 정상",
    value: "001",
    type: "AP",
  },
  {
    label: "백대직 이월",
    value: "002",
    type: "AP",
  },
  {
    label: "면세점 정상",
    value: "003",
    type: "AP",
  },
  {
    label: "백대직 이월",
    value: "004",
    type: "AP",
  },
];

export const 오픈예정: FilterOption<string>[] = [
  {
    label: "오픈예정",
    value: "10079",
    type: "오픈예정",
  },
  {
    label: "점행사",
    value: "10080",
    type: "오픈예정",
  },
  {
    label: "리뉴얼",
    value: "10081",
    type: "오픈예정",
  },
  {
    label: "폐점 예정",
    value: "10082",
    type: "오픈예정",
  },
];
