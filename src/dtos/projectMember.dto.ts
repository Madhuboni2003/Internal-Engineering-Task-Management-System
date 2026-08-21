import { z } from "zod";

export const projectIdParamSchema = z.object({
    projectId: z.coerce.bigint("projectId must be a valid number"),
});

export const addProjectMemberSchema = z.object({
    userId: z.coerce.bigint("userId must be a valid number"),
});

export const projectMemberParamsSchema = z.object({
    projectId: z.coerce.bigint("projectId must be a valid number"),
    userId: z.coerce.bigint("userId must be a valid number"),
});

export type ProjectIdParamDto = z.infer<typeof projectIdParamSchema>;
export type AddProjectMemberDto = z.infer<typeof addProjectMemberSchema>;
export type ProjectMemberParamsDto = z.infer<typeof projectMemberParamsSchema>;