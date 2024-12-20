import { Request, Response } from "express";
import USER_MODEL from "../Models/user.model";
import { errorMessage } from "../../res/utils";
import bcrypt from "bcryptjs";

type UserInfo = {
  userName: string;
  userPass: string;
  email?: string;
};

// create new user
const createNewUser = async (req: Request, res: Response) => {
  let { userName, userPass, email } = req.body;
  if (!email || email.trim() === "") {
    email = undefined;
  }

  try {
    const hashPass = await bcrypt.hash(userPass, 10);

    const userData: UserInfo = {
      userName,
      userPass: hashPass,
    };

    if (email) {
      userData.email = email;
    }

    const Cres = await USER_MODEL.create(userData);

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
