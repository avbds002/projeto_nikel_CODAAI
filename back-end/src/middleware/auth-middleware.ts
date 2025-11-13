import type { NextFunction, Request, Response } from "express";
import repository from "../database/repository";

async function auth(req: Request, res: Response, next: NextFunction) {
  const { user, password } = req.headers;

  if (user && password) {
    const userLogged = await repository.user.findUnique({
      //dessa forma ele irá receber String ao invés de undefined
      where: { login: `${user}`, password: `${password}` },
    });

    if (userLogged) {
      return next();
    }
  }

  return res
    .status(401)
    .json({ success: false, msg: "Usuário não está logado" });
}

export default auth;
