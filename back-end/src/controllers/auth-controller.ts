import type { Request, Response } from "express";
import repository from "../database/repository.js";

export class AuthController {
  async create(req: Request, res: Response) {
    const { login, password } = req.body;

    const user = await repository.user.findUnique({
      where: { login, password },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Usuário ou senha estão incorretos" });
    }

    return res
      .status(200)
      .json({ success: true, data: user, msg: "Login realizado com sucesso!" });
  }
}
