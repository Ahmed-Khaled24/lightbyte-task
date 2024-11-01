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
        const parsedData = PaginationZodSchema.parse(req.query);

        /**
         * Add the parsed data to the params
         * to make sure that default values added
         * in case of missing values
         */
        req.params = {
            ...req.params,
            ...parsedData,
        };

        next();
    } catch (error) {
        res.status(400).json({
            data: `Invalid pagination data: ${(error as Error).message}`,
        });
    }
}

export default {
    paginationData,
};
