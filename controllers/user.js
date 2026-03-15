import * as userService from "../services/user.js";

export const getProfile = (req,res)=>{
    try{

        const user = req.user;
        if(!user){
            const err = new Error("User not logged in!");
            err.statusCode = 401;
            throw err;
        }
        const {password,...others} = user;
        res.status(200).json({
            success:true,
            message:"User profile retrieved successfully",
            data:others
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            success:false,
            message:err.message,
        })
    }
}
export const updateProfile = (req,res)=>{
    try{
        const user = req.user;
        if(!user){
            const err = new Error("User not logged in!");
            err.statusCode = 401;
            throw err;
        }
        const updatedUser = userService.update_profile(user,req.body);
        const {password,...others} = updatedUser;
        res.status(200).json({
            success:true,
            message:"User profile updated successfully",
            data:others
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            success:false,
            message:err.message
        })
    }
}