import jwt from "jsonwebtoken"
import { db } from "../connect.js";
const promise = db.promise();
export const userAuth = async (req,res,next)=>{
    try{

        const token = req.cookies.token;
        console.log(req.cookies);
        if(!token){
            const err = new Error("Invalid Token");
            err.statusCode = 401;
            throw err;
        }
        const decodedObj = await jwt.verify(token,process.env.JWT_SECRET || "secret");
        const id = decodedObj.id;
        const q = "SELECT * FROM users WHERE id=?";
        const [rows] = await promise.execute(q,[id]);
        const user = rows[0];
        if(!user){
            const err = new Error("User does not exist!");
            err.statusCode = 401;
            throw err;
        }
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
}