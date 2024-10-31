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
    date: z.date().refine(
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

const EventsMongoSchema = new mongoose.Schema<z.infer<typeof EventsZodSchema>>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        attendees: {
            type: [String],
        },
    },
    {
        // By default add createdAt and updatedAt Fields
        timestamps: true,
    },
);

const EventsModel = mongoose.model("Event", EventsMongoSchema);
export default EventsModel;
