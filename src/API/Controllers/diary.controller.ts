import { Request, Response } from "express";
import DIARY_MODEL from "../Models/diary.model";
import { errorMessage } from "../../res/utils";

const createDiary = async (req: Request, res: Response) => {
  const { title, context } = req.body;
  try {
    const Cres = await DIARY_MODEL.create({
      title,
      context,
    });

    res.status(200).json({ diary: Cres });
  } catch (error) {
    errorMessage(error, res);
  }
};

export { createDiary };
