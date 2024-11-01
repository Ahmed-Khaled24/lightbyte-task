import { Response } from "express";
import { HTTPError } from "./HTTPError";

export function handleRequestError(
    res: Response,
    error: unknown,
    extraMessage?: string,
) {
    let message =
        `${extraMessage ? extraMessage + " " : ""}` + (error as Error).message;
    let code = 500;

    if (error instanceof HTTPError) {
        message = error.message;
        code = error.status;
    }

    res.status(code).json({
        data: message,
    });
}
