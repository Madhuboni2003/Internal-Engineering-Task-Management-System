import { User, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IUserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    find(id: bigint): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    update(id: bigint, data: Prisma.UserUpdateInput): Promise<User>;
    delete(id: bigint): Promise<void>;
}

export class UserRepository implements IUserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data
        });
    }

    async find(id: bigint): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async update(id: bigint, data: Prisma.UserUpdateInput): Promise<User> {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id: bigint): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }
}