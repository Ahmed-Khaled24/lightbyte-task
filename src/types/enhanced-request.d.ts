import { Request } from "express";

export interface EnhancedRequest<T = unknown> extends Request {
    body: T;
}
