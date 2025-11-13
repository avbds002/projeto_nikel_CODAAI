import type { NextFunction, Request, Response } from "express";

function transactionCreate(req: Request, res: Response, next: NextFunction) {
  const { value, date, type, description } = req.body;

  if (!value || !date || !type || !description) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "Transação inválida, erro nos campos da transação",
      });
  }

  next();
}

export default transactionCreate;
