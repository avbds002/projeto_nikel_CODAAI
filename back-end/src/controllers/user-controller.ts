import type { Request, Response } from "express";
import repository from "../database/repository";

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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password } = req.body;

    try {
      const updateDB = await repository.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          password: password,
        },
      });
      return res.status(200).json(updateDB);
    } catch (error) {
      res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = repository.user.findUnique({
        where: { id: Number(id) },
      });

      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleteDB = repository.user.delete({
        where: { id: Number(id) },
      });
      return res
        .status(200)
        .json({ success: true, msg: "usuario deletado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Erro ao deletar usuario" });
    }
  }
}
