import { Comment } from "../../generated/prisma/client.js";
import { ICommentRepository } from "../repositories/comment.repository.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { AuthUser } from "../types/auth.type.js";
import { RoleName } from "../types/role.type.js";
import { NotfoundError, ForbiddenError } from "../utils/errors/app.error.js";


export interface ICommentService {
    createComment(): Promise<void>;
    getAllComments(taskId: bigint, user: AuthUser): Promise<Comment[]>;
    getComment(taskId: bigint, user: AuthUser): Promise<Comment[]>;
    updateComment(): Promise<void>;
    deleteComment(): Promise<void>;
}

export class CommentService implements ICommentService {
    private readonly commentRepository: ICommentRepository;
    private readonly taskRepository: ITaskRepository;
    private readonly taskAssignmentRepository: ITaskAssignmentRepository;


    constructor(
        commentRepository: ICommentRepository,
        taskRepository: ITaskRepository,
        taskAssignmentRepository: ITaskAssignmentRepository
    ) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.taskAssignmentRepository = taskAssignmentRepository;
    }

    async createComment(): Promise<void> {}

    async getAllComments(taskId: bigint, user: AuthUser): Promise<Comment[]> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new NotfoundError("Task not found");
        }

        if (user.role !== RoleName.ADMIN) {
            throw new ForbiddenError("You are not authorized to view all comments on this task");
        }

        return this.commentRepository.getAll(taskId);
    }

    async getComment(taskId: bigint, user: AuthUser): Promise<Comment[]> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new NotfoundError("Task not found");
        }

        const assignment = await this.taskAssignmentRepository.findCurrent(taskId, user.userId);

        if (!assignment) {
            throw new ForbiddenError("You are not assigned to this task");
        }

        return this.commentRepository.get(taskId);
    }
    async updateComment(): Promise<void> {}

    async deleteComment(): Promise<void> {}
}