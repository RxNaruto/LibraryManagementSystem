import {z} from 'zod';

export const signupTypes = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string()
})

export const loginTypes = z.object({
    username: z.string().email(),
    password: z.string(),
  
})