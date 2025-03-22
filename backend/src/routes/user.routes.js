import express from "express";
import userController from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/reg", userController.userRegister);
userRouter.post("/login", userController.userLogin);

export default userRouter;