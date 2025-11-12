import repository from "../database/repository";
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
            res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
        }
    }
    async update(req, res) {
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
            return res.status(200).json(updateDB);
        }
        catch (error) {
            res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
        }
    }
    async show(req, res) {
        const { id } = req.params;
        try {
            const user = repository.user.findUnique({
                where: { id: Number(id) },
            });
            return res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: "Erro ao buscar usuários" });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deleteDB = repository.user.delete({
                where: { id: Number(id) },
            });
            return res
                .status(200)
                .json({ success: true, msg: "usuario deletado com sucesso!" });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao deletar usuario" });
        }
    }
}
//# sourceMappingURL=user-controller.js.map