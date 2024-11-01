import { z } from "zod";

/**
 * Page is the offset from beginning @default 1
 * Limit is the number of items in page @default 20
 */
export const PaginationZodSchema = z.object({
    page: z
        .string()
        .default("0")
        .transform(Number)
        .refine((number) => !isNaN(number), {
            message: "Page must be a number",
        })
        .refine((number) => number >= 0, {
            message: "Page must be greater than or equal 0",
        }),
    limit: z
        .string()
        .default("20")
        .transform(Number)
        .refine((number) => !isNaN(number), {
            message: "limit must be a number",
        })
        .refine((number) => number > 0, {
            message: "limit must be greater than 0",
        }),
});

export type Pagination = z.infer<typeof PaginationZodSchema>;
