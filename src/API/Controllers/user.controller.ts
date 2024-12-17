import { Request, Response } from "express";
import USER_MODEL from "../Models/user.model";
import { errorMessage } from "../../res/utils";
import bcrypt from "bcryptjs";

// create new user
const createNewUser = async (req: Request, res: Response) => {
  const { userName, userPass, email } = req.body;
  try {
    const hashPass = await bcrypt.hash(userPass, 10);

    const Cres = await USER_MODEL.create({
      userName,
      userPass: hashPass,
      email,
    });

    res.status(200).json({ user: Cres });
  } catch (error: unknown) {
    errorMessage(error, res);
  }
};

// login user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, userPass } = req.body;
  try {
    const user = await USER_MODEL.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user || !user.userPass) {
      res.status(401).json({
        type: "notUser",
        error: "UserName or Password are incorrect!",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(userPass, user.userPass);

    if (!isPasswordValid) {
      res
        .status(401)
        .json({ type: "password", error: "Password is incorrect!" });
      return;
    }

    // Exclude sensitive fields before sending the user object
    const { userPass: _, ...safeUser } = user.toObject();

    res.status(200).json({ user: safeUser });
  } catch (error) {
    errorMessage(error, res);
  }
};

export { createNewUser, loginUser };
