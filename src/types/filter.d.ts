export {};

declare global {
  type Filter = {
    name: string;
    code: string;
    index?: string;
    checked: boolean;
  };

  type StyleFilterType = "ssnCdList" | "prodLlsCdList" | "prodMlsCdList" | "itmCdList" | "prodGrpNoList" | "dmnCdList" | "subSsnCdList" | "gndrCdList";
  type StyleFilterList = Record<StyleFilterType, Filter[]>;

  type ShopFilterType = "shopTrdTypCd" | "shopMgmtTypCd" | "prodTrdTypCd" | "shopCtrtTypCd" | "srchShopGrpNos" | "alocShopGrpNos";
  type ShopFilterList = Record<ShopFilterType, Filter[]>;
}
