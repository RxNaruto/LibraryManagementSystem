import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { signupTypes,loginTypes } from "../types/user";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
const booksRouter = Router();
const prisma = new PrismaClient()

interface addBook{
    name: string;
    authorName: string;
}
booksRouter.post("/addbook",async(req,res)=>{
    const body: addBook = req.body;
    try {
        const newBook = await prisma.books.create({
            data:{
                name: body.name,
                authorName: body.authorName
            }
        })
        if(newBook){
            res.status(200).json({
                message: "Book added",
                id: newBook.id
            })
        }
        else{
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

export default booksRouter;