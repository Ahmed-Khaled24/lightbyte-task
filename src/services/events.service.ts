import eventsRepository from "../repositories/events.repository";
import { Event } from "../schemas/events.schema";

async function createEvent(event: Event) {
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
