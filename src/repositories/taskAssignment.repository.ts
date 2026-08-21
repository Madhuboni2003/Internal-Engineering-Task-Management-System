import { Prisma, TaskAssignment } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskAssignmentRepository {
    create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment>
    findCurrent(taskId: bigint, developerId: bigint): Promise<TaskAssignment | null>;
}

export class TaskAssignmentRepository implements ITaskAssignmentRepository {
    async create(data: Prisma.TaskAssignmentCreateInput): Promise<TaskAssignment> {
        
    }

    async findCurrent(taskId: bigint, developerId: bigint): Promise<TaskAssignment | null> {
        return prisma.taskAssignment.findFirst({
            where: {
                taskId,
                developerId,
                isCurrent: true
            }
        });
    }
}