import { ICommentRepository } from "../repositories/comment.repository.js";

export interface ICommentService {
    createComment(): Promise<void>;
    getAllComments(): Promise<void>;
    getComment(): Promise<void>
    updateComment(): Promise<void>;
    deleteComment(): Promise<void>;
}

export class CommentService implements ICommentService {
    private readonly commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async createComment(): Promise<void> {}

    async getAllComments(): Promise<void> {}

    async getComment(): Promise<void> {}

    async updateComment(): Promise<void> {}

    async deleteComment(): Promise<void> {}
}