import { Request, Response } from "express";
import eventsService from "../services/events.service";
import { Pagination } from "../schemas/pagination.schema";
import { Event } from "../schemas/events.schema";

async function createEvent(req: Request<never, never, Event>, res: Response) {
    try {
        const createdEvent = await eventsService.createEvent(req.body);
        res.status(201).send({
            data: createdEvent,
        });
        return;
    } catch (error) {
        res.status(500).send({
            data: `Error creating event: ${(error as Error).message}`,
        });
    }
}

async function getEvents(req: Request<Pagination>, res: Response) {
    try {
        const { page, limit } = req.params;
        const events = await eventsService.getEvents(limit, page);
        res.status(200).send({
            data: events,
        });
        return;
    } catch (error) {
        res.status(500).send({
            data: `Error getting events: ${(error as Error).message}`,
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
        res.status(200).send({
            data: event,
        });
        return;
    } catch (error) {
        res.status(500).send({
            data: `Error getting event: ${(error as Error).message}`,
        });
    }
}

async function deleteEvent(req: Request, res: Response) {}

async function updateEvent(req: Request, res: Response) {}

async function subscribeEvent(req: Request, res: Response) {}

async function unsubscribeEvent(req: Request, res: Response) {}

export default {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
    subscribeEvent,
    unsubscribeEvent,
};
