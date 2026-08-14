import { z } from 'zod';

export const createUserSchema = z.object({
    fullName: z.string()
        .min(1, 'fullName must contain at least 1 character')
        .max(150, 'fullName must not exceed 150 characters'),
    email: z.email('email must be a valid email address')
        .max(255, 'email must not exceed 255 characters'),
    password: z.string()
        .min(8, 'password must be at least 8 characters')
});

export type CreateUserDto = z.infer<typeof createUserSchema>;