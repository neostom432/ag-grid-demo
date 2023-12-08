import { z } from "zod";
import { ynSchema } from "./base";

const nullishStr = z.string().nullish();
const nullishStrArr = z.string().array().nullish();

export const storedValueSchema = z.object({
  brandCd: nullishStr,
  operSsnCd: nullishStr,
  operSsnCds: nullishStrArr,
  ssnCd: nullishStr,
  ssnCds: nullishStrArr,
  prodStsCd: nullishStr,
  prodStsCds: nullishStrArr,
  prodGrpNo: nullishStr,
  prodGrpNos: nullishStrArr,
  shopGrpCd: nullishStr,
  shopGrpCds: nullishStrArr,
  apCd: nullishStr,
  apCds: nullishStrArr,
  fromApCd: nullishStr,
  fromApCds: nullishStrArr,
  toApCd: nullishStr,
  toApCds: nullishStrArr,
  prodTrdCd: nullishStr,
  prodTrdCds: nullishStrArr,
  shopCtrtCd: nullishStr,
  shopCtrtCds: nullishStrArr,
  mrgYn: ynSchema.nullish(),
});

declare global {
  type StoredValue = z.infer<typeof storedValueSchema>;
}
