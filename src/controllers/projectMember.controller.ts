import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IProjectMemberService } from "../services/projectMember.service.js";
import { AddProjectMemberDto } from "../dtos/projectMember.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";
import { RoleName } from "../types/role.type.js";

export class ProjectMemberController {
    private readonly projectMemberService: IProjectMemberService;

    constructor(projectMemberService: IProjectMemberService) {
        this.projectMemberService = projectMemberService;
    }

    async addProjectMemberHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req as AuthenticatedRequest;

            const projectId = BigInt(req.params.projectId as string);
            const data = req.body as AddProjectMemberDto;

            const member = await this.projectMemberService.addProjectMember(
                projectId,
                data.userId,
                user.userId
            );

            sendSuccess(res, member, StatusCodes.CREATED, "Developer added to project successfully");
        } catch (error) {
            next(error);
        }
    }

    async getProjectMembersHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req as AuthenticatedRequest;

            const projectId = BigInt(req.params.projectId as string);

            const members = await this.projectMemberService.listProjectMembers(
                projectId,
                user.userId,
                user.role as RoleName
            );

            sendSuccess(res, members, StatusCodes.OK, "Project members fetched successfully");
        } catch (error) {
            next(error);
        }
    }
    
    async removeProjectMemberHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const projectId = BigInt(req.params.projectId as string);
            const userId = BigInt(req.params.userId as string);

            await this.projectMemberService.removeProjectMember(projectId, userId);

            sendSuccess(res, null, StatusCodes.OK, "Developer removed from project successfully");
        } catch (error) {
            next(error);
        }
    }

}