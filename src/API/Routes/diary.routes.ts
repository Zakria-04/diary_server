import { Router } from "express";
import {
  createDiary,
  deleteDiary,
  getAllUserDiary,
  updateDiary,
} from "../Controllers/diary.controller";

const diaryRouter = Router();

diaryRouter.post("/create_diary", createDiary);
diaryRouter.post("/get_diary", getAllUserDiary);
diaryRouter.delete("/delete_diary", deleteDiary);
diaryRouter.patch("/update_diary", updateDiary);

export default diaryRouter;
