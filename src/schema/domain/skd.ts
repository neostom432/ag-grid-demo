import { z } from "zod";

export const storeScheduleSchema = z.object({
  shopCd: z.string(),
  shopNm: z.string(),
  tit: z.string(),
});

declare global {
  type StoreSchedule = z.infer<typeof storeScheduleSchema>;
}
