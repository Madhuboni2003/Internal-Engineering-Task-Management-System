import {
    IUnassignmentReasonRepository
} from "../repositories/unassignmentReason.repository.js";

import { UnassignmentReason } from "../../generated/prisma/client.js";

export interface IUnassignmentReasonService {
    getAllReasons(): Promise<UnassignmentReason[]>;
}

export class UnassignmentReasonService implements IUnassignmentReasonService {
    private readonly unassignmentReasonRepository: IUnassignmentReasonRepository;

    constructor(unassignmentReasonRepository: IUnassignmentReasonRepository) {
        this.unassignmentReasonRepository = unassignmentReasonRepository;
    }

    async getAllReasons(): Promise<UnassignmentReason[]> {
        return this.unassignmentReasonRepository.getAllReasons();    
    }
}