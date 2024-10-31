import { z } from "zod";

/**
 * Page is the offset from beginning @default 1
 * Limit is the number of items in page @default 20
 */
export const PaginationZodSchema = z.object({
    page: z
        .string()
        .transform(Number)
        .refine((number) => !isNaN(number), {
            message: "Page must be a number",
        })
        .default("0"),
    limit: z
        .string()
        .transform(Number)
        .refine((number) => !isNaN(number), {
            message: "limit must be a number",
        })
        .default("20"),
});

export type Pagination = z.infer<typeof PaginationZodSchema>;
