import { Prisma, UnassignmentReason } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IUnassignmentReasonRepository {
  create(data: Prisma.UnassignmentReasonCreateInput): Promise<UnassignmentReason>;
  findAll(): Promise<UnassignmentReason[]>;
  findById(id: bigint): Promise<UnassignmentReason | null>;
  update(id: bigint, data: Prisma.UnassignmentReasonUpdateInput): Promise<UnassignmentReason>;
  delete(id: bigint): Promise<UnassignmentReason>;
}

export class UnassignmentReasonRepository implements IUnassignmentReasonRepository {
  async create(data: Prisma.UnassignmentReasonCreateInput): Promise<UnassignmentReason> {
    return prisma.unassignmentReason.create({ data });
  }

  async findAll(): Promise<UnassignmentReason[]> {
    return prisma.unassignmentReason.findMany();
  }

  async findById(id: bigint): Promise<UnassignmentReason | null> {
    return prisma.unassignmentReason.findUnique({
      where: { id },
    });
  }

  async update(id: bigint, data: Prisma.UnassignmentReasonUpdateInput): Promise<UnassignmentReason> {
    return prisma.unassignmentReason.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint): Promise<UnassignmentReason> {
    return prisma.unassignmentReason.delete({
      where: { id },
    });
  }
}