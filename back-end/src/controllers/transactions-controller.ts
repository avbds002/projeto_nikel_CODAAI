import type { Request, Response } from "express";
import repository from "../database/repository";

export class TransactionController {
  async index(req: Request, res: Response) {
    try {
      const transaction = await repository.transaction.findMany();

      res.status(200).json({ success: true, data: transaction });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao realizar transação" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { value, type, description, date } = req.body;

      const transaction = repository.transaction.create({
        data: {
          value: Number(value),
          date,
          type: Number(type),
          description,
        },
      });

      res
        .status(200)
        .json({ success: true, msg: "Lançamento realizado com sucesso!" });
    } catch (error) {}
  }

  async show(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}
