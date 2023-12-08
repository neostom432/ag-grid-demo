import { required_error } from "@/constants";
import { Sigan } from "@/utils";
import { z } from "zod";

export const SiganSchema = z.custom<Sigan>((val) => val instanceof Sigan, {
  message: required_error,
});

export const SiganRangeSchema = z.tuple([SiganSchema, SiganSchema], { required_error });
export const NullableSiganSchema = SiganSchema.nullable();
export const nullableSiganRangeSchema = z.tuple([NullableSiganSchema, NullableSiganSchema], { required_error });

export type NullableSiganRange = z.infer<typeof nullableSiganRangeSchema>;
