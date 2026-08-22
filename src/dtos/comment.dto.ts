import { z } from "zod";

export const commentIdSchema = z.object({
    commentId: z.coerce.bigint({ message: "commentId must be a valid number" })
});

export type CommentIdDto = z.infer<typeof commentIdSchema>;
// implement all the dtos below here