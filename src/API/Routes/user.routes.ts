import { Router } from "express";
import { createNewUser, loginUser } from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/create_user", createNewUser);
userRouter.post("/login_user", loginUser);

export default userRouter;
