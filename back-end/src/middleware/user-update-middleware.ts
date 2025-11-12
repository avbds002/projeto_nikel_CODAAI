import type { NextFunction, Request, Response } from "express";

function userUpdate(req: Request, res: Response, next: NextFunction) {
  const { name, password } = req.body;

  if (name || password) {
    return next();
  }

  return res
    .status(400)
    .json({ success: false, msg: "Campo nome ou senha são obrigatórios" });
}

export default userUpdate;
