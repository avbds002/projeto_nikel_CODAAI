import type { NextFunction, Request, Response } from "express";
import repository from "../database/repository.js";

async function existTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  const transaction = await repository.transaction.findUnique({
    where: { id: Number(id) },
  });

  if (transaction) {
    return next();
  }

  return res
    .status(400)
    .json({ success: false, msg: "Transaction não encontrada" });
}

export default existTransaction;
