import { Comment, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ICommentRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    getAll(): Promise<Comment[]>;
    get(id: bigint): Promise<Comment>;
    update(is: bigint): Promise<Comment>;
    delete(id: bigint): Promise<void>;
}

export class CommentRepository implements ICommentRepository {
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {}

    async getAll(): Promise<Comment[]> {}

    async get(id: bigint): Promise<Comment> {}

    async update(is: bigint): Promise<Comment> {}

    async delete(id: bigint): Promise<void> {}
}