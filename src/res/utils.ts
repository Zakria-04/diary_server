import { Response } from "express";

export const errorMessage = (error: unknown, res: Response) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";

  res.status(500).json({ error: true, errorMsg: errorMessage });

  return errorMessage;
};
