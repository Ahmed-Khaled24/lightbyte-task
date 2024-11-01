import eventsRepository from "../repositories/events.repository";
import { Event } from "../schemas/events.schema";

async function createEvent(event: Omit<Event, "id" | "attendees">) {
    const creator = event.createdBy;

    // Get event created today by the current creator
    const creatorEvents = await eventsRepository.getEventsByUsername(creator);
    const eventsCreatedToday = creatorEvents.filter((event) => {
        const today = new Date();
        const eventDate = new Date(event.date);

        return (
            today.getDate() === eventDate.getDate() &&
            today.getFullYear() === eventDate.getFullYear() &&
            today.getMonth() === eventDate.getMonth()
        );
    });

    // Check the 5-per-day limit
    if (eventsCreatedToday.length > 5) {
        throw new HTTPError(
            "Invalid operation: User can at most create 5 events per day, this is your sixths, come back tomorrow.",
            403,
        );
    }

    return await eventsRepository.createEvent(event);
}

async function getEvents(page: number, limit: number) {
    return await eventsRepository.getEvents(null, page, limit);
}

async function getEvent(id: string) {
    return await eventsRepository.getEvents(id, 0, 0);
}

async function deleteEvent(id: string) {
    return await eventsRepository.deleteEvent(id);
}

export default {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
};
