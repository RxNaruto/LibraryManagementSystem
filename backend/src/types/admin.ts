import {z} from 'zod';

export const adminSignupTypes = z.object({
    adminId: z.number(),
    password: z.string(),
    name: z.string()
})

export const adminLoginTypes = z.object({
    adminId: z.number(),
    password: z.string(),
  
})