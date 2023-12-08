import { required_error } from "@/constants";
import { z } from "zod";

export const reqStrSchema = z.string({ required_error, invalid_type_error: required_error }).min(1, required_error);
export const reqStrArrSchema = reqStrSchema.array().min(1, required_error);

export const nonEmptyStringSchema = z.string({ required_error }).refine((value) => value !== "", {
  message: required_error,
});

export const nonEmptyArraySchema = <T>(schema: z.Schema<T>) =>
  z.array(schema, { required_error, invalid_type_error: required_error }).refine((value) => value.length > 0, { message: required_error });
export const strictNonEmptyArraySchema = <T>(schema: z.Schema<T>) => z.array(schema, { required_error }).nonempty({ message: required_error });

export const nonEmptyStringArraySchema = nonEmptyArraySchema(nonEmptyStringSchema);
export const strictNonEmptyStingArraySchema = strictNonEmptyArraySchema(nonEmptyStringSchema);

export const ynSchema = z.union([z.literal("Y"), z.literal("N")]);

export const strDateSchema = z.string().refine(
  (value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      return false; // 날짜 형식에 맞지 않으면 거부
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1 해줍니다.

    // 날짜 유효성 검사
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  },
  {
    message: "올바른 날짜 형식이어야 합니다 (yyyy-mm-dd).",
  }
);

export const strDateRangeSchema = z.tuple([strDateSchema.nullable(), strDateSchema.nullable()], { required_error });
export const strDateRangeMendatorySchema = z.tuple([strDateSchema, strDateSchema], { required_error });
