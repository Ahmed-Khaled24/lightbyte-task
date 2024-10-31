import { NextFunction, Request, Response } from "express";
import { EventsZodSchema } from "../../schemas/events.schema";

export function createEvent(req: Request, res: Response, next: NextFunction) {
    try {
        EventsZodSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).send({
            data: `Invalid event data: ${(error as Error).message}`,
        });
    }
}

export default {
    createEvent,
};
