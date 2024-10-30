import { Router } from "express";
import eventsRouter from "./events.router";

const globalRouter = Router();

// Collect all resource routers
globalRouter.use("/events", eventsRouter);
// globalRouter.use("/users", usersRouter);

export default globalRouter;
