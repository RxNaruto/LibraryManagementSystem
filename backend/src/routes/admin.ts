import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { adminLoginTypes, adminSignupTypes } from "../types/admin";
import jwt from "jsonwebtoken"
import {JWT_SECRET2 } from "../config";
const adminRouter = Router();
const prisma = new PrismaClient()

interface signupBody{
    adminId: number;
    password: string;
    name: string;
}
adminRouter.post("/signup",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = adminSignupTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    const user = await prisma.admin.findFirst({
        where:{
            adminId: body.adminId
        }
    })
    if(user){
         return res.status(403).json({
            message: "user already exist"
         })
    }

    try {
        const newUser = await prisma.admin.create({
            data: {
                adminId: body.adminId,
            password: body.password,
            name: body.name
            }
        })
        
        if(newUser){
            const token = jwt.sign({userId: newUser.id},JWT_SECRET2)
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
    adminId: number;
    password: string;
}
adminRouter.post("/login",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = adminLoginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.admin.findFirst({
            where: {
                adminId: body.adminId,
            password: body.password,
        
            }
        })
       
        if(user){
            const token = jwt.sign({userId: user.id},JWT_SECRET2)
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
interface adminDelete{
    adminId: number,
    password: string
}

adminRouter.delete("/delete",async(req,res)=>{
    const body: adminDelete = req.body;
    const {success} = adminLoginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.admin.delete({
            where: {
            adminId: body.adminId,
            password: body.password
            
        
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
interface adminUpdate{
    adminId: number,
    password: string,
    name: string,
}

adminRouter.put("/update",async(req,res)=>{
    const body: adminUpdate = req.body;
    const {success} = adminLoginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const user = await prisma.admin.update({
            where: {
                adminId: body.adminId,
            password: body.password
        
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


export default adminRouter;