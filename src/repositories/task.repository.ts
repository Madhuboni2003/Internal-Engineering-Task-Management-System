import { prisma } from "../configs/db.config.js";
import { Prisma, Task } from "../../generated/prisma/client.js";

export interface ITaskRepository {
  findById(id: bigint): Promise<Task | null>;
  findAllForAdmin(projectId: bigint): Promise<Task[]>;
  findAllForDeveloper(developerId: bigint, projectId: bigint): Promise<Task[]>;
  create(data: any): Promise<Task>;
  updateTask(taskId: bigint, data: Prisma.TaskUpdateInput): Promise<Task>;
  
}

export class TaskRepository implements ITaskRepository {
  async findById(id: bigint): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
  async findAllForAdmin(projectId: bigint): Promise<Task[]> {
  return prisma.task.findMany({
    where: {
      projectId,
    },
  });
}
  
async findAllForDeveloper(developerId: bigint, projectId: bigint): Promise<Task[]> {
  return prisma.task.findMany({
    where: {
      projectId,
      assignments: {
        some: {
          developerId,
          isCurrent: true,
        },
      },
    },
  });
}
  

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({
      data
    });
  }

  async updateTask(taskId: bigint, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data
    });
  }
  
  
}
