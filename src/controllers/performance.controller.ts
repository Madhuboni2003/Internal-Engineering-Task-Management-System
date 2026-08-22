import { Request, Response, NextFunction } from "express";

import { IPerformanceService } from "../services/performance.service.js";

export class PerformanceController {
    private readonly performanceService: IPerformanceService;

    constructor(performanceService: IPerformanceService) {
        this.performanceService = performanceService;
    }

    getCurrentUserPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getCurrentUserTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getCurrentUserPerformanceTrendHandler(req: Request, res: Response, next: NextFunction): void {}

    getAllDevelopersPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperTaskLevelPerformanceHandler(req: Request, res: Response, next: NextFunction): void {}

    getDeveloperPerformanceTrendHandler(req: Request, res: Response, next: NextFunction): void {}
}