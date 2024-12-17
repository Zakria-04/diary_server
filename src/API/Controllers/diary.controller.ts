import { Request, Response } from "express";
import DIARY_MODEL from "../Models/diary.model";
import { errorMessage } from "../../res/utils";

const createDiary = async (req: Request, res: Response) => {
  const { title, context, authID } = req.body;
  try {
    const Cres = await DIARY_MODEL.create({
      authID,
      title,
      context,
    });

    res.status(200).json({ diary: Cres });
  } catch (error) {
    errorMessage(error, res);
  }
};

const getAllUserDiary = async (req: Request, res: Response) => {
  const { authID } = req.body;

  try {
    const diaryList = await DIARY_MODEL.find();

    const userDiaryList = [];

    for (let i = 0; i < diaryList.length; i++) {
      if (authID === diaryList[i].authID) {
        userDiaryList.unshift(diaryList[i]);
      }
    }

    res.status(200).json(userDiaryList);
  } catch (error) {
    errorMessage(error, res);
  }
};

const deleteDiary = async (req: Request, res: Response) => {
  const { diaryIDs } = req.body;
  try {
    if (!Array.isArray(diaryIDs) || diaryIDs.length === 0) {
      res.status(400).json({ error: "Invalid or empty diary IDs array!" });
      return;
    }

    const result = await DIARY_MODEL.deleteMany({ _id: { $in: diaryIDs } });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "No diaries found for the provided IDs!" });
      return;
    }

    res.status(200).json({
      message: "Diaries deleted successfully!",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

const updateDiary = async (req: Request, res: Response) => {
  const { diaryID, title, context } = req.body;
  try {
    const selectedDiary = await DIARY_MODEL.findByIdAndUpdate({})
  } catch (error) {
    errorMessage(error, res);
  }
};

export { createDiary, deleteDiary, getAllUserDiary, updateDiary };
