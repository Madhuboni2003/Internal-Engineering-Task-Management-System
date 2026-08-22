import { Comment, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ICommentRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    getAll(taskId: bigint): Promise<Comment[]>;
    get(id: bigint): Promise<Comment | null>;
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

    async get(id: bigint): Promise<Comment | null> {
        return prisma.comment.findUnique({
            where: { id }
        });
    }

    async update(is: bigint): Promise<Comment> {}

    async delete(id: bigint): Promise<void> {
        await prisma.comment.delete({
            where: { id }
        });
    }

}