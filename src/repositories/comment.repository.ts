import { Comment, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ICommentRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    getAll(taskId: bigint): Promise<Comment[]>;
    get(taskId: bigint): Promise<Comment[]>;
    update(is: bigint): Promise<Comment>;
    delete(id: bigint): Promise<void>;
}

export class CommentRepository implements ICommentRepository {
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {}

    async getAll(taskId: bigint): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: {
                taskId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    }

    async get(taskId: bigint): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: {
                taskId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    }

    async update(is: bigint): Promise<Comment> {}

    async delete(id: bigint): Promise<void> {}
}