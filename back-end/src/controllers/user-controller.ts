import type { Request, Response } from "express";
import repository from "../database/repository.js";

export class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await repository.user.findMany();

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
    }
  }

  async create(req: Request, res: Response) {
    const { login, password } = req.body;

    try {
      const create = await repository.user.create({
        data: { login, password },
      });

      return res
        .status(201)
        .json({ success: true, create, msg: "Usuário criado com sucesso !" });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Erro ao criar usuários" });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { name, password } = req.body;

    try {
      const updateDB = await repository.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          password: password,
        },
      });
      return res.status(200).json({ success: false, data: updateDB });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
    }
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const user = await repository.user.findUnique({
        where: { id: Number(id) },
      });

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleteDB = await repository.user.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        success: true,
        msg: "usuario deletado com sucesso!",
        data: deleteDB,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Erro ao deletar usuario" });
    }
  }
}
