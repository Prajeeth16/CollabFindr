import { db } from "../connect.js";


const promise = db.promise();

export const update_profile = async (user,body)=>{
    const allowedUpdates = ["bio","github_url","img","linkedin_url"];
    const isAllowed = Object.keys(body).every((key)=>{
        return(allowedUpdates.includes(key));
    })
    if(!isAllowed){
        const err = new Error("The specified fields cant be updated");
        err.statusCode = 400;
        throw err;
    }
    const q = "UPDATE users SET bio=?,github_url=?,img=?,linkedin_url=?";
    const values = [body.bio,body.github_url,body.img,body.linkedink];
    const [result] = await promise.execute(q,values);
    const [rows] = await promise.execute("SELECT * FROM users WHERE id = ?",[user.id]);
    return rows[0];
}