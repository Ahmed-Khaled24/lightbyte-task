import { Router } from "express";
import eventsValidator from "../middlewares/validators/events.validator";
import paginationValidator from "../middlewares/validators/pagination.validator";
import mongoValidator from "../middlewares/validators/mongo.validator";
import eventsController from "../controllers/events.controller";
import authentication from "../middlewares/auth/authentication";

const eventsRouter = Router();

eventsRouter.post(
    "/",
    authentication.authenticate,
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
    authentication.authenticate,
    mongoValidator.IdParam,
    eventsValidator.updateEvent,
    eventsController.updateEvent,
);

eventsRouter.post(
    "/:id/subscribe",
    authentication.authenticate,
    mongoValidator.IdParam,
    eventsController.subscribeEvent,
);

eventsRouter.post(
    "/:id/unsubscribe",
    authentication.authenticate,
    mongoValidator.IdParam,
    eventsController.unsubscribeEvent,
);

export default eventsRouter;
