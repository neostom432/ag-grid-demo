export {};

declare global {
  type PriorityRtQtyMap = Record<string, DistRtDtlInfo>; // [priority에 따른 매장명] : tkt qty
  type PriorityRtQtyMapPerPcs = Record<string, { shopRtQtyMap: PriorityRtQtyMap; comment?: string }>; // [pcs] : PriorityRtQtyMap

  // FIXME: 타입 확인 필요함 @도혜원
  type DistRtDtlInfo = {
    no?: string;
    dtlNo?: string;
    qty: number;
  };

  // FIXME: 타입 확인 필요함 @도혜원
  type DistDtlInfo = {
    no: string;
    dtlNo: string;
    qty: number;
  };

  type ShopPriorityMapPerPcs = Record<
    string, // stringifySpcs
    {
      supplPri: Record<string, number>;
      tktPri: Record<string, number>;
    }
  >;
}
