import mongoose from "mongoose";
import { z } from "zod";

export const EventsZodSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    createdBy: z.string().min(1),
    attendees: z.array(z.string().min(1)).optional(),
    id: z
        .string()
        .refine(
            (id) => {
                try {
                    new mongoose.Types.ObjectId(id);
                    return true;
                } catch {
                    return false;
                }
            },
            {
                message: "Invalid MongoDB Id",
            },
        )
        .optional(),
    date: z
        .string()
        .refine(
            (date) => {
                const dateObj = new Date(date);
                return !isNaN(dateObj.getTime());
            },
            {
                message: "Invalid date format.",
            },
        )
        .refine(
            (date) => {
                // Make sure that date is in the future
                const dateObj = new Date(date);
                return dateObj > new Date();
            },
            {
                message: "Date must be in the future.",
            },
        ),
});
