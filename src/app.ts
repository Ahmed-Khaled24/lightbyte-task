import express from "express";
import globalRouter from "./routers";

const app = express();

app.use(express.json());
app.use("/api", globalRouter);

export default app;
