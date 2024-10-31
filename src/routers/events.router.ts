import { Router } from "express";
import eventsValidator from "../middlewares/validators/events.validator";
import paginationValidator from "../middlewares/validators/pagination.validator";
import mongoValidator from "../middlewares/validators/mongo.validator";
import eventsController from "../controllers/events.controller";

const eventsRouter = Router();

eventsRouter.post(
    "/",
    eventsValidator.createEvent,
    eventsController.createEvent,
);

eventsRouter.get(
    "/",
    paginationValidator.paginationData,
    eventsController.getEvents,
);

eventsRouter.get("/:id", mongoValidator.IdParam, eventsController.getEvent);

eventsRouter.delete(
    "/:id",
    mongoValidator.IdParam,
    eventsController.deleteEvent,
);

eventsRouter.patch(
    "/:id",
    mongoValidator.IdParam,
    eventsController.updateEvent,
);

eventsRouter.post(
    "/:id/subscribe",
    mongoValidator.IdParam,
    eventsController.subscribeEvent,
);

eventsRouter.post(
    "/:id/unsubscribe",
    mongoValidator.IdParam,
    eventsController.unsubscribeEvent,
);

export default eventsRouter;
