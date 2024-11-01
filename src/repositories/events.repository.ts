import EventsModel from "../models/events.model";
import { Event } from "../schemas/events.schema";

/**
 * Create a new event
 * @param event The complete event data to create
 * @returns The created event
 */
async function createEvent(event: Omit<Event, "id" | "attendees">) {
    return await EventsModel.create(event);
}

/**
 * Delete an event with the given id
 * @param id The id of the event to delete
 * @returns The deleted event
 */
async function deleteEvent(id: string) {
    return await EventsModel.findByIdAndDelete(id);
}

/**
 * If Id passed only the requested event is returned,
 * otherwise all events are returned (considering pagination)
 * @param id Id of the event to get
 * @param page The page number to get
 * @param limit The number of events to get per page
 */
async function getEvents(id: string | null, page: number, limit: number) {
    const filter: Partial<Event> = {};

    if (id) {
        filter.id = id;
    }

    return await EventsModel.find(filter)
        .skip(page * limit)
        .limit(limit);
}

/**
 * Update an event with the given id
 * @param id The id of the event to update
 * @param update Only the fields that need to be updated
 * @returns The new event after update
 */
async function updateEvent(id: string, update: Partial<Omit<Event, "id">>) {
    return await EventsModel.findByIdAndUpdate(id, update, { new: true });
}

/**
 * Get all events created by the given user
 * @param username The user that created the events
 */
async function getEventsByUsername(username: string) {
    return await EventsModel.find({ createdBy: username });
}

export default {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
    getEventsByUsername,
};
