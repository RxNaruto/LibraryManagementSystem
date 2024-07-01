import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { signupTypes,loginTypes } from "../types/user";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
const userRouter = Router();
const prisma = new PrismaClient()

interface signupBody{
    username: string;
    password: string;
    name: string;
}
userRouter.post("/signup",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = signupTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    const user = await prisma.user.findFirst({
        where:{
            username: body.username
        }
    })
    if(user){
         return res.status(403).json({
            message: "user already exist"
         })
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                username: body.username,
            password: body.password,
            name: body.name
            }
        })
        
        if(newUser){
            const token = jwt.sign({userId: newUser.id},JWT_SECRET)
            res.status(200).json({
                message: "Signup complete",
                token: token
            })
        }
        else{
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

interface loginBody{
    username: string;
    password: string;
}
userRouter.post("/login",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = loginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
            password: body.password,
        
            }
        })
       
        if(user){
            const token = jwt.sign({userId: user.id},JWT_SECRET)
            res.status(200).json({
                message: "Signin complete",
                token: token
            })
        }
        else{
            res.status(403).json({
                message: "User doesn't exist"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

userRouter.delete("/delete",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = loginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.user.delete({
            where: {
                username: body.username,
            password: body.password,
        
            }
        })
        if(user){
            res.status(200).json({
                message: "user deleted"
            })
        }
        else{
            res.status(403).json({
                message: "User doesn't exist"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

userRouter.put("/update",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = loginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.user.update({
            where: {
            username: body.username,
            password: body.password,
        
            },
            data: {
                name: body.name
            }
                
            
        })
        if(user){
            res.status(200).json({
                message: "Details Updated"
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(403).json({
            message: "User doesn't exist"
        })
    }
})

export default userRouter;