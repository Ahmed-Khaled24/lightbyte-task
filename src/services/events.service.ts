import eventsRepository from "../repositories/events.repository";
import { CreateEvent, Event, UpdateEvent } from "../schemas/events.schema";
import { HTTPError } from "../utils/HTTPError";

async function createEvent(event: CreateEvent & Pick<Event, "createdBy">) {
    const creator = event.createdBy;

    // Get event created today by the current creator
    const creatorEvents = await eventsRepository.getEventsByUsername(creator);

    const eventsCreatedToday = creatorEvents.filter((event) => {
        const today = new Date();
        const eventDate = new Date(event.createdAt);

        return (
            today.getFullYear() === eventDate.getFullYear() &&
            today.getMonth() === eventDate.getMonth() &&
            today.getDate() === eventDate.getDate()
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

async function updateEvent(id: string, event: UpdateEvent) {
    return await eventsRepository.updateEvent(id, event);
}

async function subscribeEvent(id: string, username: string) {
    const [targetEvent] = await eventsRepository.getEvents(id, 0, 0);

    if (!targetEvent) {
        throw new HTTPError("Event not found!", 404);
    }

    // Check if the event still in the future
    const eventDate = new Date(targetEvent.date);
    if (eventDate < new Date()) {
        throw new HTTPError("Can not RSVP to ended event", 403);
    }

    // Check if user is already subscribed
    const eventAttendees = targetEvent.attendees;
    const alreadySubscribed = eventAttendees.find(
        (attendee) => attendee === username,
    );
    if (alreadySubscribed) {
        throw new HTTPError("Already RSVPed to this event", 409);
    }

    // Add the user to attendees list
    const newAttendees: Event["attendees"] = [
        ...targetEvent.attendees,
        username,
    ];

    return await eventsRepository.updateEvent(id, { attendees: newAttendees });
}

async function unsubscribeEvent(id: string, username: string) {
    const [targetEvent] = await eventsRepository.getEvents(id, 0, 0);

    if (!targetEvent) {
        throw new HTTPError("Event not found!", 404);
    }

    // Check if the event still in the future
    const eventDate = new Date(targetEvent.date);
    if (eventDate < new Date()) {
        throw new HTTPError("Can not un-RSVP from ended event", 403);
    }

    // Check if user is already unsubscribed
    const eventAttendees = targetEvent.attendees;
    const attendeeIndex = eventAttendees.findIndex(
        (attendee) => attendee === username,
    );
    if (attendeeIndex === -1) {
        throw new HTTPError("Already un-RSVPed user", 409);
    }

    // Remove the user from attendees list
    const newAttendees = eventAttendees.filter(
        (attendee) => attendee !== username,
    );

    return await eventsRepository.updateEvent(id, { attendees: newAttendees });
}

export default {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
    subscribeEvent,
    unsubscribeEvent,
};
