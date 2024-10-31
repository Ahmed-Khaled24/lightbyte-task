import mongoose from "mongoose";
import { Event } from "../schemas/events.schema";

const EventsMongoSchema = new mongoose.Schema<Event>(
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
            type: String,
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
