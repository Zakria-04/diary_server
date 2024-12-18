import { Request, Response } from "express";
import DIARY_MODEL from "../Models/diary.model";
import { errorMessage } from "../../res/utils";
import USER_MODEL from "../Models/user.model";

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
  const { diaryIDs, authID } = req.body;
  try {
    if (!Array.isArray(diaryIDs) || diaryIDs.length === 0) {
      res.status(400).json({ error: "Invalid or empty diary IDs array!" });
      return;
    }

    const user = await USER_MODEL.findById(authID);

    if (!user) {
      res.status(404).json("user not found!");
    }

    // check if one of the provided diary auth ids does not match with the auth id to prevent deleting other users diary
    for (let i = 0; i < diaryIDs.length; i++) {
      const findDiaryDocument = await DIARY_MODEL.findById(diaryIDs[i]);

      if (findDiaryDocument?.authID !== authID) {
        res.status(404).json({
          error:
            "something went wrong, diary auth id does not match with the auth id",
        });
        return;
      }
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
    if (diaryID === undefined) {
      res.status(401).json({ error: "invalid or missing diary id" });
      return;
    }

    const selectedDiary = await DIARY_MODEL.findOneAndUpdate(
      { _id: diaryID },
      { title, context },
      { new: true }
    );

    if (!selectedDiary) {
      res.status(404).json({ error: "No diaries found for the provided id!" });
      return;
    }

    res.status(200).json({ message: "diary has been updated successfully" });
  } catch (error) {
    errorMessage(error, res);
  }
};

export { createDiary, deleteDiary, getAllUserDiary, updateDiary };
