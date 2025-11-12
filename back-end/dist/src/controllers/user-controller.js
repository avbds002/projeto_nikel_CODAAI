import repository from "../database/repository.js";
import { success } from "zod";
export class UserController {
    async index(req, res) {
        try {
            const users = await repository.user.findMany();
            res.status(200).json({ succes: true, data: users });
        }
        catch (error) {
            res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
        }
    }
    async create(req, res) {
        const { login, password } = req.body;
        try {
            const create = await repository.user.create({
                data: { login, password },
            });
            return res.status(201).json(create);
        }
        catch (error) {
            res.status(500).json({ succes: false, msg: "Erro ao buscar usuários" });
        }
    }
    update() { }
    show() { }
    delete() { }
}
//# sourceMappingURL=user-controller.js.map