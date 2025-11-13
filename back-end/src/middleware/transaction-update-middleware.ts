import type { NextFunction, Request, Response } from "express";

function transactionUpdate(req: Request, res: Response, next: NextFunction) {
  const { value, date, type, description } = req.body;
  if (value || date || type || description) {
    next();
  }

  return res
    .status(400)
    .json({ success: false, msg: "Não foi possível atualizar a transação!" });
}

export default transactionUpdate;
