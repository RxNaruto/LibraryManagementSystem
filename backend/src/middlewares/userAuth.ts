import jwt from "jsonwebtoken";
import { JWT_SECRET2} from "../config";
import { Request,Response,NextFunction } from "express";


export const userAuth = (req:Request,res:Response,next: NextFunction)=>{
    const token: any = req.headers.token;
    if(!token){
        return res.status(404).json({
            message: "You are not authorized"
        })
    }
   try {
     const decode = jwt.verify(token,JWT_SECRET2);
     next();
   } catch (error) {
    return res.status(404).json({
        message:"User not verified"
    })
    
   }

}