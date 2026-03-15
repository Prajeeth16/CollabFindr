import { jwtToken } from "../utils/jwt.js";
import * as authService from "../services/auth.js";


export const signUp = async (req,res,next) => {
    try{

        const createdUser = await authService.createUser(req.body);
        const token = jwtToken(createdUser.id);
        res.cookie("token",token,{
            httpOnly:true
        })
        const {password,...others} = createdUser;
        res.status(201).json({
            success:true,
            message:"USer created successfully",
            data:others
        })
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({
            success:false,
            message:err.message});
    }
}
export const login = async (req,res,next)=>{
    try{
        const user = await authService.loginUser(req.body.email,req.body.password);
        const token = jwtToken(user.id);
        const {password,...others} = user;
        res.cookie("token",token,{
            httpOnly:true

        })
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:others
        })
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({
            success:false,
            message:err.message
        })
    }
}
export const logout = async (req,res)=>{
    res.clearCookie("token",{
        secure:true,
        sameSite:"none"
    }).status(200).json({
        success:true,
        message:"User has been logged out successfully"
    })
}