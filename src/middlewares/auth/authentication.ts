import { NextFunction, Request, Response } from "express";

/**
 * A dummy middleware to fill out req.user object
 * with constant username
 */
async function authenticate(req: Request, res: Response, next: NextFunction) {
    req.user = {
        username: "veryTrustedUser",
    };
    next();
}

export default {
    authenticate,
};
