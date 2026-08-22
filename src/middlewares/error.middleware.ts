import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/app.error.js";
import { NODE_ENV } from "../configs/server.config.js";
import { logger } from "../configs/logger.config.js";

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        const body: Record<string, unknown> = {
            success: false,
            message: error.message,
        };

        if (error.details !== undefined) {
            body.details = error.details;
        }

        res.status(error.statusCode).json(body);

        return;
    }

    logger.error('Unknown error occured', { details: error });

    const body: Record<string, unknown> = {
        success: false,
        message: "Something went wrong",
    };

    if (NODE_ENV === "development" && error instanceof Error) {
        body.details = error.stack;
    }

    res.status(500).json(body);
    
}