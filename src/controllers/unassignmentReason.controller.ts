import { Request, Response, NextFunction } from "express";
import { IUnassignmentReasonService } from "../services/unassignmentReason.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { CreateUnassignmentReasonDto, UpdateUnassignmentReasonDto } from "../dtos/unassignmentReason.dto.js";


export class UnassignmentReasonController {
  private readonly unassignmentReasonService: IUnassignmentReasonService;

  constructor(unassignmentReasonService: IUnassignmentReasonService) {
    this.unassignmentReasonService = unassignmentReasonService;
  }

  async createUnassignmentReasonHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body as CreateUnassignmentReasonDto;

      const reason = await this.unassignmentReasonService.createUnassignmentReason(data);

      sendSuccess(res, reason, 201, "Unassignment reason created successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllUnassignmentReasonsHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasons = await this.unassignmentReasonService.findAllUnassignmentReasons();

      sendSuccess(res, reasons, 200, "Unassignment reasons fetched successfully");
    } catch (error) {
      next(error);
    }
  }
   async getUnassignmentReasonByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasonId = BigInt(req.params.reasonId as string);

      const reason = await this.unassignmentReasonService.findUnassignmentReasonById(reasonId);

      sendSuccess(res, reason, 200, "Unassignment reason fetched successfully");
    } catch (error) {
      next(error);
    }
  }
   async updateUnassignmentReasonHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasonId = BigInt(req.params.reasonId as string);
      const data = req.body as UpdateUnassignmentReasonDto;

      const reason = await this.unassignmentReasonService.updateUnassignmentReason(reasonId, data);

      sendSuccess(res, reason, 200, "Unassignment reason updated successfully");
    } catch (error) {
      next(error);
    }
  }
 async deleteUnassignmentReasonHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reasonId = BigInt(req.params.reasonId as string);

      const reason = await this.unassignmentReasonService.deleteUnassignmentReason(reasonId);

      sendSuccess(res, reason, 200, "Unassignment reason deleted successfully");
    } catch (error) {
      next(error);
    }
  }

}