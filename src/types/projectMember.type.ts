import { Prisma } from "../../generated/prisma/client.js";

export type ProjectMemberWithUser = Prisma.ProjectMemberGetPayload<{
    include: {
        user: {
            select: {
                fullName: true;
                email: true;
            };
        };
    };
}>;