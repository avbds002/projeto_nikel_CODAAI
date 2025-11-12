import type { NextFunction, Request, Response } from "express";

function userCreate(req: Request, res: Response, next: NextFunction) {
  const { login, password } = req.body;

  if (!login || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Campo login e senha são obrigatórios" });
  }

  next();
}

export default userCreate;
