import { Submission } from "../../generated/prisma/client.js";
import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { UnauthorizedError , NotfoundError} from "../utils/errors/app.error.js";
import { RoleName } from "../types/role.type.js";


export interface ISubmissionService {
    createSubmission(): Promise<void>; // populate parametrs and return type with using dto
    findTaskSubmissions(taskId: bigint, userId: bigint, role: RoleName): Promise<Submission[]>;
}

export class SubmissionService implements ISubmissionService {
    private readonly submissionRepository: ISubmissionRepository;
    private readonly taskRepository: ITaskRepository;

    constructor(
        submissionRepository: ISubmissionRepository,
        taskRepository: ITaskRepository,
        
    ) {
        this.submissionRepository = submissionRepository;
        this.taskRepository = taskRepository;
        
    }
    
    async createSubmission(): Promise<void> {
        // implement properly
    }

    async findTaskSubmissions(taskId: bigint): Promise<Submission[]> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new NotfoundError("Task not found");
        }

        return this.submissionRepository.findByTaskId(taskId);
    }


}