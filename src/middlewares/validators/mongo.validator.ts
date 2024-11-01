import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import mongoose from "mongoose";

function IdParam(req: Request, res: Response, next: NextFunction) {
    const IdSchema = z.object({
        id: z.string().refine(
            (id) => {
                try {
                    new mongoose.Types.ObjectId(id);
                    return true;
                } catch {
                    return false;
                }
            },
            {
                message: "Invalid MongoDB Id",
            },
        ),
    });

    try {
        IdSchema.parse(req.params);
        next();
    } catch (error) {
        res.status(400).json({
            data: `Invalid Id: ${(error as Error).message}`,
        });
    }
}

export default {
    IdParam,
};
