import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/app.error.js";
import { verifyToken } from "../utils/helpers/jwt.helper.js";
import { AccessTokenClaims } from "../utils/helpers/jwt.helper.js";

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            throw new BadRequestError("Authentication required");
        }

        const claims: AccessTokenClaims = verifyToken(token);
        let userId: bigint;

        try {
            userId = BigInt(claims.userId);
        } catch (error) {
            throw new BadRequestError('Invalid Token Payload')
        }

        req.user = { userId, role: claims.role };
        next();
    } catch (error) {
        next(error);
    }
}