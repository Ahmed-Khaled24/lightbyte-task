import { NextFunction, Request, Response } from "express";
import {
    EventsCreateZodSchema,
    EventsUpdateZodSchema,
} from "../../schemas/events.schema";

export function createEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedData = EventsCreateZodSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        res.status(400).send({
            data: `Invalid event data: ${(error as Error).message}`,
        });
    }
}

export function updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedData = EventsUpdateZodSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        res.status(400).send({
            data: `Invalid event data: ${(error as Error).message}`,
        });
    }
}

export default {
    createEvent,
    updateEvent,
};
