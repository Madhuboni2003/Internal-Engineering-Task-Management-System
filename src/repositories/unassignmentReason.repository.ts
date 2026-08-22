import { prisma } from "../configs/db.config.js";
import { UnassignmentReason } from "../../generated/prisma/client.js";

export interface IUnassignmentReasonRepository {
    getAllReasons(): Promise<UnassignmentReason[]>;
}

export class UnassignmentReasonRepository
    implements IUnassignmentReasonRepository {

    async getAllReasons(): Promise<UnassignmentReason[]> {
        return prisma.unassignmentReason.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }
}