import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string()
        .min(1, 'name must contain at least 1 character')
        .max(50, 'name must not exceed 50 characters'),
    description: z.string()
        .max(255, 'description must not exceed 255 characters')
        .nullish()
});



export type CreateRoleDto = z.infer<typeof createRoleSchema>;

