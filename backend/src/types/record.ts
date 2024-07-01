import z from "zod";

export const addRecordTypes=z.object({
    userId: z.number(),
    bookId: z.number()

})