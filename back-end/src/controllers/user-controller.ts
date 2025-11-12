import type { Request, Response } from "express";
import repository from "../database/repository.js";
import { success } from "zod";

export class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await repository.user.findMany();

      res.status(200).json({ succes: true, data: users });
    } catch (error) {
      res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
    }
  }

  async create(req: Request, res: Response) {
    const { login, password } = req.body;

    try {
      const create = await repository.user.create({
        data: { login, password },
      });

      return res.status(201).json(create);
    } catch (error) {
      res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
    }
  }

  update() {}

  show() {}

  delete() {}
}
