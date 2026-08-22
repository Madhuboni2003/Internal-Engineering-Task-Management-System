import { Request, Response, NextFunction } from "express";
import { IUnassignmentReasonService } from "../services/unassignmentReason.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class UnassignmentReasonController {
    private readonly unassignmentReasonService: IUnassignmentReasonService;

    constructor(unassignmentReasonService: IUnassignmentReasonService) {
        this.unassignmentReasonService = unassignmentReasonService;
    }

    async getAllReasonsHandler(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reasons =
                await this.unassignmentReasonService.getAllReasons();

            sendSuccess(
                res,
                reasons,
                200,
                "Unassignment reasons fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}