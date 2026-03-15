import jwt from "jsonwebtoken";
export const jwtToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET || "secret",{expiresIn:process.env.JWT_EXPIRES_IN || '90d'});
    return token
}