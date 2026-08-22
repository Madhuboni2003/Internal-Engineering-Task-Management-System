import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>
    findCurrentAssignment(taskId: bigint, developerId: bigint): Promise<TaskAssignment | null>
    getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]>
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
    async create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment> {
        return prisma.taskAssignment.create({
            data
        });
    }

    async findCurrentAssignment(taskId: bigint, developerId: bigint): Promise<TaskAssignment | null> {
        return prisma.taskAssignment.findFirst({
            where: {
                taskId,
                developerId,
                isCurrent: true
            }
        });
    }

    async getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]> {
        return prisma.taskAssignment.findMany({
            where: {
                taskId
            },
            orderBy: {
                assignedAt: "asc"
            }
        });
    }
}



