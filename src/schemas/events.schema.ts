import mongoose from "mongoose";
import { z } from "zod";

/**
 * This is the complete schema, basically used
 * in database and internally in the application.
 */
export const EventsZodSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    createdBy: z.string().min(1),
    attendees: z.array(z.string().min(1)),
    createdAt: z.string().refine(validateStringDate, {
        message: "Invalid date format.",
    }),
    updatedAt: z.string().refine(validateStringDate, {
        message: "Invalid date format.",
    }),
    id: z.string().refine(
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
    ),
    date: z
        .string()
        .refine(validateStringDate, {
            message: "Invalid date format.",
        })
        .refine(validateStringDateInFuture, {
            message: "Date must be in the future.",
        }),
});

/**
 * The schema to use when create new events.
 * Also, to validate incoming data from the client.
 */
export const EventsCreateZodSchema = EventsZodSchema.omit({
    id: true,
    attendees: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
});

/**
 * @note for this type we remove the id and attendees fields
 * because this type if used in update events endpoint which is
 * not supposed to update the id and attendees fields.
 * @note attendees field is updated from subscribe and
 * unsubscribe events endpoints.
 */
export const EventsUpdateZodSchema = EventsZodSchema.omit({
    id: true,
    attendees: true,
}).partial();

export type Event = z.infer<typeof EventsZodSchema>;
export type CreateEvent = z.infer<typeof EventsCreateZodSchema>;
export type UpdateEvent = z.infer<typeof EventsUpdateZodSchema>;

// ? Helper functions (to get plugged into zod refine)

function validateStringDate(date: string) {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
}

function validateStringDateInFuture(date: string) {
    const dateObj = new Date(date);
    return dateObj > new Date();
}
