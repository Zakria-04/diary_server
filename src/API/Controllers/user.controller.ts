import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import USER_MODEL from "../Models/user.module";
import findUserByID from "../../res/utils";

//* creating a new user
const createNewUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, userPass } = req.body;

  //  hash the password to make it secure
  const hashPass = await bcrypt.hash(userPass, 10);

  try {
    const Cres = await USER_MODEL.create({
      userName: userName,
      userPass: hashPass,
    });
    res.status(200).json({ user: Cres });
  } catch (error) {
    console.error("Error on creating new user", error);
    res.status(500).json({ error: "failed to create new user" });
  }
};

//* login user information
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, userPass } = req.body;

    const user = await USER_MODEL.findOne({ userName });

    if (!user) {
      res.status(401).json({
        auth: false,
        errorMessage: "name or password are incorrect",
      });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(userPass, user.userPass);

    if (!isPasswordValid) {
      res.status(401).json({
        auth: false,
        errorMessage: "name or password are incorrect",
      });
      return;
    }

    if (isPasswordValid) {
      res.status(200).json({ user });
      return;
    }
  } catch (error: any) {
    console.error("Error logging user ", error);
    res.status(500).json({ errorMessage: error.message });
    return;
  }
};

//* create a new diary and push it to the db
const createNewDiary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userID, diaryData } = req.body;
    // find user based on ID
    const user = await findUserByID(userID);

    if (!user) {
      res.status(404).json({ error: "user has not been found!" });
      return;
    }
    user.userDiaryData.unshift(diaryData);

    // save the updated user data
    const response = await user.save();

    // Respond with the updated user data
    res.status(200).json({ user: response });
  } catch (error: any) {
    console.error("Error on submitting diary data", error.message);
    res.status(500).json({ error: true, errorMessage: error.message });
  }
};

//* delete diary item from db
const removeDiaryFromDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userID, diaryID } = req.body;

    const user = await findUserByID(userID);

    if (!user) {
      res.status(500).json({ error: "user has not been found" });
      return;
    }
    // get user based on id
    function checkID(getID: { id?: number }) {
      return getID.id === diaryID;
    }
    // get index of the item
    const getDiaryIndex = user.userDiaryData.findIndex(checkID);
    if (getDiaryIndex !== -1) {
      user.userDiaryData.splice(getDiaryIndex, 1);
    }

    const response = await user.save();
    res.status(200).json({ user: response });
  } catch (error: any) {
    console.error("Error removing diary from db", error.message);
    res.status(500).json({ error: error.message });
  }
};

export { createNewUser, loginUser, createNewDiary, removeDiaryFromDB };
