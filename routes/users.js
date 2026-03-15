import express from "express";
import * as userController from "../controllers/user.js"

const router = express.Router();

router.get("/profile",userController.getProfile);
router.put("/profile",userController.updateProfile);


export default router