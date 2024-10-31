import http from "node:http";
import app from "./app";
import mongoose from "mongoose";
import { validateEnvVariables } from "./utils/env";

async function initialization() {
    const env = validateEnvVariables();

    const server = http.createServer(app);

    await mongoose.connect(env.MONGO_URL);

    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

initialization();
