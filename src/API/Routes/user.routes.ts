import { Router } from "express";
import {
  createNewDiary,
  createNewUser,
  loginUser,
  removeDiaryFromDB,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/create_user", createNewUser);
userRouter.post("/login_user", loginUser);
userRouter.post("/create_diary", createNewDiary);
userRouter.post("/remove_diary_from_db", removeDiaryFromDB);

export default userRouter;
