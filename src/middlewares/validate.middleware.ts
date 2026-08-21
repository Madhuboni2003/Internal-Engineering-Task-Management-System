import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { BadRequestError } from "../utils/errors/app.error.js";

export const validateRequestBody = (schema: ZodType) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError: Record<string, string>[] = error.issues.map(
        (issue) => ({
          message: issue.message,
          field: issue.path.join("."),
        })
      );

      const message =
        formattedError[0]?.message || "Validation failed";

      next(new BadRequestError(message, { details: formattedError }));
      return;
    }

    next(error);
  }
};

export const validateRequestParams = (schema: ZodType) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError: Record<string, string>[] = error.issues.map(
        (issue) => ({
          message: issue.message,
          field: issue.path.join("."),
        })
      );

      const message =
        formattedError[0]?.message || "Validation failed";

      next(new BadRequestError(message, { details: formattedError }));
      return;
    }

    next(error);
  }
};

export const validateRequestQuery = (schema: ZodType) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parse(req.query);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError: Record<string, string>[] = error.issues.map(
        (issue) => ({
          message: issue.message,
          field: issue.path.join("."),
        })
      );

      const message =
        formattedError[0]?.message || "Validation failed";

      next(new BadRequestError(message, { details: formattedError }));
      return;
    }

    next(error);
  }
};