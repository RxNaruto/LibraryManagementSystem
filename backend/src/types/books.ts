import z, { string } from "zod"

export const addBookTypes=z.object({
    name: z.string(),
    authorName: z.string()
})
