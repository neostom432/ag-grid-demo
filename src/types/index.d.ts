export {};

declare global {
  type Option<T> = {
    label: string;
    value: T;
  };

  type APIData<T> = {
    data: T;
    status: number;
    error?: string;
  };

  type OptionGroup<T = string, K = string> = {
    id: T;
    label: string;
    optionList: Option<K>[];
  };

  type TimeRange = { startDate: string; endDate: string };
  type ProdLv = "S" | "SC" | "SCS";
  type NavigatorSourceType = "modal" | "select";
}
