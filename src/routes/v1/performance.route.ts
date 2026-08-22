import { Router } from "express";

import { PerformanceController } from "../../controllers/performance.controller.js";
import { PerformanceService } from "../../services/performance.service.js";

const performanceController = new PerformanceService();

export const performanceRouter = Router();

// implement all the routes below here