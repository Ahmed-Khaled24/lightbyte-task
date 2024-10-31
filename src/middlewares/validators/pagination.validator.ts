import { NextFunction, Response, Request } from "express";
import {
    Pagination,
    PaginationZodSchema,
} from "../../schemas/pagination.schema";

function paginationData(
    req: Request<Pagination>,
    res: Response,
    next: NextFunction,
) {
    try {
        const pagination = PaginationZodSchema.parse(req.query);

        /**
         * Update pagination data to make sure default values
         * added in case it weren't passed by the user
         */
        req.params = {
            ...req.params,
            ...pagination,
        };

        next();
    } catch (error) {
        res.status(400).send({
            data: `Invalid pagination data: ${(error as Error).message}`,
        });
    }
}

export default {
    paginationData,
};
