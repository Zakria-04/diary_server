import { Router } from "express";
import {
  createNewDiary,
  createNewUser,
  loginUser,
  removeDiaryFromDB,
  updateProfile,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/create_user", createNewUser);
userRouter.post("/login_user", loginUser);
userRouter.post("/create_diary", createNewDiary);
userRouter.post("/remove_diary_from_db", removeDiaryFromDB);
userRouter.post("/update_profile", updateProfile);

export default userRouter;
