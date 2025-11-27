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

      const transaction = await repository.transaction.create({
        data: {
          value: Number(value),
          date,
          type: Number(type),
          description,
        },
      });

      res.status(200).json({
        success: true,
        msg: "Lançamento realizado com sucesso!",
        data: transaction,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, msg: "Erro ao cadastrar lançamento" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const transaction = await repository.transaction.findUnique({
        where: { id: Number(id) },
      });

      res.status(200).json({ success: true, data: transaction });
    } catch (error) {
      res
        .status(500)
        .json({ success: true, msg: "Erro ao consultar transação pelo ID" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const { value, date, type, description } = req.body;

      const updateDB = await repository.transaction.update({
        where: { id: Number(id) },
        data: {
          value: Number(value),
          date: new Date(date),
          type: Number(type),
          description,
        },
      });

      return res.status(200).json({ success: true, data: updateDB });
    } catch (error) {
      res.status(500).json({
        success: true,
        msg: "Erro ao realizar atualização de transação",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const deleteTransaction = await repository.transaction.delete({
      where: { id: Number(id) },
    });

    return res
      .status(200)
      .json({ success: true, msg: "Lançamento excluido com sucesso" });
  }
}
