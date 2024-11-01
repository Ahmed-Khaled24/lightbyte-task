import { Request, Response } from "express";
import eventsService from "../services/events.service";
import { Pagination } from "../schemas/pagination.schema";
import { CreateEvent, Event, UpdateEvent } from "../schemas/events.schema";
import { HTTPError } from "../utils/HTTPError";

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
        let message = `Error creating event: ${(error as Error).message}`;
        let code = 500;

        if (error instanceof HTTPError) {
            message = error.message;
            code = error.status;
        }

        res.status(code).json({
            data: message,
        });
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
        let message = `Error getting events: ${(error as Error).message}`;
        let code = 500;

        if (error instanceof HTTPError) {
            message = error.message;
            code = error.status;
        }

        res.status(code).json({
            data: message,
        });
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
        let message = `Error getting event: ${(error as Error).message}`;
        let code = 500;

        if (error instanceof HTTPError) {
            message = error.message;
            code = error.status;
        }

        res.status(code).json({
            data: message,
        });
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
        res.status(500).json({
            data: `Error deleting event: ${(error as Error).message}`,
        });
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
        res.status(500).json({
            data: `Error updating event: ${(error as Error).message}`,
        });
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
        let message = `Error subscribing: ${(error as Error).message}`;
        let code = 500;

        if (error instanceof HTTPError) {
            message = error.message;
            code = error.status;
        }

        res.status(500).json({
            data: message,
        });
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
        let message = `Error unsubscribing event: ${(error as Error).message}`;
        let code = 500;

        if (error instanceof HTTPError) {
            message = error.message;
            code = error.status;
        }

        res.status(500).json({
            data: message,
        });
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
