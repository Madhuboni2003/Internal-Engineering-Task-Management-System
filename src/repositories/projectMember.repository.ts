import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { ProjectMemberWithUser } from "../types/projectMember.type.js";

export interface IProjectMemberRepository {
    create(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
    findActiveMembership(projectId: bigint, userId: bigint): Promise<boolean>;
    findByProjectId(projectId: bigint): Promise<ProjectMemberWithUser[]>;
    findByProjectId(projectId: bigint): Promise<ProjectMemberWithUser[]>;
    update(id: bigint, data: Prisma.ProjectMemberUpdateInput): Promise<ProjectMember>;
}


export class ProjectMemberRepository implements IProjectMemberRepository {
    async create(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember> {
        const data: Prisma.ProjectMemberCreateInput = {
            project: { connect: { id: projectId } },
            user: { connect: { id: userId } },
            addedByUser: { connect: { id: addedBy } },
        };

        return await prisma.projectMember.create({
            data
        });
    }

    async findActiveMembership(projectId: bigint, userId: bigint): Promise<boolean> {
        const membership = await prisma.projectMember.findFirst({
            where: {
                projectId,
                userId,
                removedAt: null
            },

            select: { id: true }
        });

        return membership != null;
    }

    async findByProjectId(projectId: bigint): Promise<ProjectMemberWithUser[]> {
    return await prisma.projectMember.findMany({
        where: { projectId },
        include: {
            user: {
                select: {
                    fullName: true,
                    email: true
                }
            }
        },
        orderBy: { joinedAt: "desc" }
    });
}

   async update(id: bigint, data: Prisma.ProjectMemberUpdateInput): Promise<ProjectMember> {
        return await prisma.projectMember.update({
            where: { id },
            data
        });
    }

}