import { Prisma, Project } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateProjectDto } from "../dtos/project.dto.js";

export interface IProjectRepository {
  create(data: CreateProjectDto, createdBy: bigint): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  updateProject(projectId: bigint, data: Prisma.ProjectUpdateInput): Promise<Project>;
  getProjectById(projectId: bigint): Promise<Project | null>;
  isProjectExist(projectId: bigint): Promise<boolean>;
}

export class ProjectRepository implements IProjectRepository {
  async create(data: CreateProjectDto, createdBy: bigint): Promise<Project> {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        startDate: data.startDate
          ? new Date(data.startDate)
          : null,
        targetEndDate: data.targetEndDate
          ? new Date(data.targetEndDate)
          : null,
        creator: {
          connect: {
            id: createdBy,
          },
        },
      },
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getProjectById(projectId: bigint): Promise<Project | null> {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async isProjectExist(projectId: bigint): Promise<boolean> {
    const project = await prisma.project.findFirst({
      where: { id: projectId },
      select: { id: true }
    });

    return project !== null;
  }

  async updateProject(projectId: bigint, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return prisma.project.update({
      where: {
        id: projectId,
      },
      data
    });
  }

}
