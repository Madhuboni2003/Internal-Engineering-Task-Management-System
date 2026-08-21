import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";

export class TaskController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async getTaskByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.taskId as string;
      
      const task = await this.taskService.getTaskById(BigInt(taskId));

      sendSuccess(res, task, 200, "Task fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  async createTaskHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;
      const taskData = req.body;

      const task = await this.taskService.createTask(taskData, user.userId);

      sendSuccess(res, task, 201, "Task created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateTaskHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.taskId as string;
      const updateData = req.body;

      const updatedTask = await this.taskService.updateTask(BigInt(taskId), updateData);

      sendSuccess(res, updatedTask, 200, "Task updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async getTasksHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req as AuthenticatedRequest;

    const projectId = BigInt(req.query.projectId as string);

    const tasks = await this.taskService.getTasks(
      user.userId,
      user.role,
      projectId
    );

    sendSuccess(res, tasks, 200, "Tasks fetched successfully");
  } catch (error) {
    next(error);
    }
  }
}