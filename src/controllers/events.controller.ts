import { Request, Response } from "express";
import eventsService from "../services/events.service";
import { Pagination } from "../schemas/pagination.schema";
import { CreateEvent, Event, UpdateEvent } from "../schemas/events.schema";
import { handleRequestError } from "../utils/request-error-handler";

async function createEvent(
    req: Request<never, never, CreateEvent>,
    res: Response,
) {
    try {
        // Combine user data with the event data
        const completeEvent: CreateEvent & Pick<Event, "createdBy"> = {
            ...req.body,
            createdBy: req.user?.username ?? "Anonymous",
        };
        const createdEvent = await eventsService.createEvent(completeEvent);

        res.status(201).json({
            data: createdEvent,
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error creating event:");
    }
}

async function getEvents(req: Request<Pagination>, res: Response) {
    try {
        const { page, limit } = req.params;
        const events = await eventsService.getEvents(page, limit);

        res.status(200).json({
            data: events,
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error getting events:");
    }
}

async function getEvent(
    req: Request<Required<Pick<Event, "id">>>,
    res: Response,
) {
    try {
        const { id } = req.params;
        const event = await eventsService.getEvent(id);

        res.status(200).json({
            data: event,
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error getting event:");
    }
}

async function deleteEvent(
    req: Request<Required<Pick<Event, "id">>>,
    res: Response,
) {
    try {
        const { id } = req.params;
        const deletedEvent = await eventsService.deleteEvent(id);

        res.status(200).json({
            data: deletedEvent,
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error deleting event:");
    }
}

async function updateEvent(
    req: Request<Required<Pick<Event, "id">>, never, UpdateEvent>,
    res: Response,
) {
    try {
        const { id } = req.params;
        const updatedEvent = await eventsService.updateEvent(id, req.body);

        res.status(200).json({
            data: updatedEvent,
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error updating event:");
    }
}

// RSVP
async function subscribeEvent(
    req: Request<Required<Pick<Event, "id">>>,
    res: Response,
) {
    try {
        const { id } = req.params;
        const username = req.user?.username ?? "Anonymous";
        await eventsService.subscribeEvent(id, username);

        res.status(200).json({
            data: "Subscribed to event.",
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error subscribing to event:");
    }
}

// un-RSVP
async function unsubscribeEvent(
    req: Request<Required<Pick<Event, "id">>>,
    res: Response,
) {
    try {
        const { id } = req.params;
        const username = req.user?.username ?? "Anonymous";
        await eventsService.unsubscribeEvent(id, username);

        res.status(200).json({
            data: "Unsubscribed from event.",
        });
        return;
    } catch (error) {
        handleRequestError(res, error, "Error unsubscribing from event:");
    }
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
