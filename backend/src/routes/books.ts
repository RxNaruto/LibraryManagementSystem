import { Router } from "express";
import { PrismaClient } from '@prisma/client'
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

booksRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id ;
    try {
        const book = await prisma.books.update({
            where: {
                id: Number(id)
            },
            data :{
                available: false
            }
        });
        if(book){
            res.status(200).json({
                message: "Book deleted successfully"
            })
        }
        else{
            res.status(400).json({
                message: "error"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Internal server error"
        })
        
    }
})

booksRouter.put("/restore/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const book = await prisma.books.update({
            where: {
                id: Number(id)
            },
            data :{
                available: true
            }
        });
        if(book){
            res.status(200).json({
                message: "Book added successfully"
            })
        }
        else{
            res.status(400).json({
                message: "error"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Internal server error"
        })
        
    }
})

export default booksRouter;