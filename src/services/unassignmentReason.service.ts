import { Prisma, UnassignmentReason } from "../../generated/prisma/client.js";
import { IUnassignmentReasonRepository } from "../repositories/unassignmentReason.repository.js";
import { CreateUnassignmentReasonDto, UpdateUnassignmentReasonDto } from "../dtos/unassignmentReason.dto.js";
import { ConflictError, InternalServerError, NotfoundError } from "../utils/errors/app.error.js";


export interface IUnassignmentReasonService {
  createUnassignmentReason(data: CreateUnassignmentReasonDto): Promise<UnassignmentReason>;
  findAllUnassignmentReasons(): Promise<UnassignmentReason[]>;
  findUnassignmentReasonById(reasonId: bigint): Promise<UnassignmentReason>; 
  updateUnassignmentReason(reasonId: bigint, data: UpdateUnassignmentReasonDto): Promise<UnassignmentReason>;
  deleteUnassignmentReason(reasonId: bigint): Promise<UnassignmentReason>;
}

export class UnassignmentReasonService implements IUnassignmentReasonService {
  private readonly unassignmentReasonRepository: IUnassignmentReasonRepository;

  constructor(unassignmentReasonRepository: IUnassignmentReasonRepository) {
    this.unassignmentReasonRepository = unassignmentReasonRepository;
  }

  async createUnassignmentReason(data: CreateUnassignmentReasonDto): Promise<UnassignmentReason> {
    try {
      const createData: Prisma.UnassignmentReasonCreateInput = {
        code: data.code,
        label: data.label,
        affectsPerformance: data.affectsPerformance,
      };

      return await this.unassignmentReasonRepository.create(createData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError(`Unassignment reason with code '${data.code}' already exists`);
      }

      throw new InternalServerError("Failed to create unassignment reason");
    }
  }

  async findAllUnassignmentReasons(): Promise<UnassignmentReason[]> {
    try {
      return await this.unassignmentReasonRepository.findAll();
    } catch (error) {
      throw new InternalServerError("Failed to fetch unassignment reasons");
    }
  }
  async findUnassignmentReasonById(reasonId: bigint): Promise<UnassignmentReason> {
    const reason = await this.unassignmentReasonRepository.findById(reasonId);

    if (!reason) {
      throw new NotfoundError(`No unassignment reason found with this given id: ${reasonId}`);
    }

    return reason;
  }
  async updateUnassignmentReason(reasonId: bigint, data: UpdateUnassignmentReasonDto): Promise<UnassignmentReason> {
    try {
      const updateData: Prisma.UnassignmentReasonUpdateInput = {
        ...(data.code !== undefined && data.code !== null && { code: data.code }),
        ...(data.label !== undefined && data.label !== null && { label: data.label }),
        ...(data.affectsPerformance !== undefined &&
          data.affectsPerformance !== null && { affectsPerformance: data.affectsPerformance }),
      };

      return await this.unassignmentReasonRepository.update(reasonId, updateData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError(`Unassignment reason with code '${data.code}' already exists`);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new NotfoundError(`No unassignment reason found with this given id: ${reasonId}`);
      }

      throw new InternalServerError("Failed to update unassignment reason");
    }
  }

  async deleteUnassignmentReason(reasonId: bigint): Promise<UnassignmentReason> {
    try {
      return await this.unassignmentReasonRepository.delete(reasonId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new NotfoundError(`No unassignment reason found with this given id: ${reasonId}`);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
        throw new ConflictError(
          "Cannot delete this reason — it is currently referenced by one or more task assignments"
        );
      }

      throw new InternalServerError("Failed to delete unassignment reason");
    }
  }
}