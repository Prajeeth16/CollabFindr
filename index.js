import express from "express"
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import { userAuth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json())
app.use(cookieParser())




app.use("/users",authRouter);
app.use("/users",userAuth,userRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
});

app.listen(8800,()=>{
    console.log("Server running")
})