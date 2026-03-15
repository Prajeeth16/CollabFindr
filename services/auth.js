import { db } from "../connect.js";
import bcrypt from "bcryptjs";
const promise = db.promise();
export const createUser = async (body)=>{
    const q = "SELECT name,email,bio,github_url,img,linkedin_url FROM users WHERE email=?";
    const [users] = await promise.execute(q,[body.email]);
    if(users.length){
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
    }
    const hashedPassword = await bcrypt.hash(body.password,10);
    const stmt = "INSERT INTO users(`name`,`email`,`password`,`bio`,`github_url`,`img`,`linkedin_url`) values(?,?,?,?,?,?,?)";
    const values = [body.name,body.email,hashedPassword,body.bio || null,body.github_url || null,body.img || null,body.linkedin_url || null];
    const [rows,fields] = await promise.execute(stmt,values);
    const [user] = await promise.execute(q,[body.email]);
    return user[0];
}
export const loginUser = async (email,password)=>{
    const q = "SELECT * FROM users WHERE email = ?";
    const [users]  = await promise.execute(q,[email]);
    if(users.length === 0){
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }
    const user = users[0];
    const passCheck = await bcrypt.compare(password,user.password);
    if(!passCheck){
        const err = new Error("Invalid Credentials");
        err.statusCode = 401;
        throw err;
    }
    return user;
}