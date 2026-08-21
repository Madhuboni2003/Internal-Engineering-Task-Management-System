import { Prisma, Task } from "../../generated/prisma/client.js";
import { CreateTaskDto } from "../dtos/task.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";
import { UpdateTaskDto } from "../dtos/task.dto.js";
import { logger } from "../configs/logger.config.js";
export interface ITaskService {
  getTaskById(taskId: bigint): Promise<Task>;
  getTasks(userId: bigint, role: string, projectId?: bigint): Promise<Task[]>;
  createTask(data: CreateTaskDto, createdBy: bigint): Promise<Task>;
}

export class TaskService implements ITaskService {
  private readonly taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getTaskById(taskId: bigint): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotfoundError("Task not found");
    }

    return task;
  }
  async getTasks(userId: bigint, role: string, projectId: bigint): Promise<Task[]> {
  if (role === "ADMIN") {
    return this.taskRepository.findAllForAdmin(projectId);
  }

  if (role === "DEVELOPER") {
    return this.taskRepository.findAllForDeveloper(
      userId,
      projectId
    );
  }

  return [];
}

  async createTask(data: CreateTaskDto, createdBy: bigint): Promise<Task> {
    const task = await this.taskRepository.create({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      createdBy,
      deadline: data.deadline
        ? new Date(data.deadline)
        : undefined,
    });

    return task;
  }
  
  async updateTask(taskId: bigint, data: UpdateTaskDto) {
    const existingTask = await this.taskRepository.findById(taskId);
    
    if (!existingTask) {
      logger.error(`Task update failed. Task not found with ID: ${taskId}`);
      throw new NotfoundError("Task not found"); 
    }

    const updateData: Prisma.TaskUpdateInput = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.priority !== undefined) {
      updateData.priority = data.priority;
    }

    if (data.deadline !== undefined) {
      updateData.deadline = data.deadline;
    }

    const updatedTask = await this.taskRepository.updateTask(
      taskId, 
      updateData
    );
    
    return updatedTask;
  }
}