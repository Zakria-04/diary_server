import { Router } from "express";
import { createDiary } from "../Controllers/diary.controller";

const diaryRouter = Router();

diaryRouter.post("/create_diary", createDiary);

export default diaryRouter;
