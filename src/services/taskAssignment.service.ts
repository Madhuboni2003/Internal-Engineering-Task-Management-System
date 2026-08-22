import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { TaskAssignment } from "../../generated/prisma/client.js";

export interface ITaskAssignmentService {
    assignTask(): Promise<void>  // populate parameter and return type using dto
    reAssignTask(): Promise<void>  // populate parameter and return type using dto
    unAssignTask(): Promise<void>  // populate parameter and return type using dto
    getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]>

    // rest methods create one by one
}

export class TaskAssignmentService implements ITaskAssignmentService {
    private readonly taskassignmentRepository: ITaskAssignmentRepository;

    constructor(taskassignmentRepository: ITaskAssignmentRepository) {
        this.taskassignmentRepository = taskassignmentRepository;
    }

    async assignTask(): Promise<void> {
        // implement properly
    }

    async reAssignTask(): Promise<void> {
        // implement properly
    }

    async unAssignTask(): Promise<void> {
        // implement properly
    }
    async getAssignmentHistory(taskId: bigint): Promise<TaskAssignment[]> {
        return this.taskassignmentRepository.getAssignmentHistory(taskId);
    }
}