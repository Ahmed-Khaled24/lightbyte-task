import { z } from "zod";

export function validateEnvVariables() {
    const EnvZodSchema = z.object({
        PORT: z
            .string()
            .transform((port) => {
                const parsedPort = parseInt(port);
                if (isNaN(parsedPort)) {
                    throw new Error("Invalid PORT number");
                }
                return parsedPort;
            })
            .refine((port) => port > 0 && port < 65536, {
                message: "PORT number must be between 0 and 65536",
            }),
        MONGO_URL: z.string(),
    });

    return EnvZodSchema.parse(process.env);
}
