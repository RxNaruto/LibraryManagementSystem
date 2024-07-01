import { Router } from "express";
import { PrismaClient } from '@prisma/client'
const recordsRouter = Router();
const prisma = new PrismaClient()

interface addRecord {
    userId: number;
    bookId: number;
}
recordsRouter.post("/addrecord", async (req, res) => {
    const body: addRecord = req.body;
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate()+7);

    try {
        const newRecord = await prisma.records.create({
            data: {
                userId: body.userId,
                bookId: body.bookId,
                startDate: currentDate,
                endDate: endDate
            }
        })
        if (newRecord) {
            res.status(200).json({
                message: "Book added",
                id: newRecord.id
            })
        }
        else {
            res.status(404).json({
                message: "service not available"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })

    }
})
recordsRouter.get("/log/:id",async(req,res)=>{
    const bookId = req.params.id;
    try {
        const log = await prisma.records.findFirst({
            where:{
                bookId: Number(bookId)
            },
            select: {
                user: {
                    select:{
                        name: true
                      }
                },
                book: {
                    select:{
                        name: true
                      }
                },
                startDate:true,
                endDate:true
            }
    
        })
        if(log){
            res.status(200).json({
                record: log
            })
        }
        else{
            res.status(400).json({
                message: "no log found"
            })
        }
    } catch (error) {
        
       res.status(500).json({
        message: "Internal Server error"
       })
    }
})

export default recordsRouter;