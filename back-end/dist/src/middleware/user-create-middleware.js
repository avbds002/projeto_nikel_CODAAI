function userCreate(req, res, next) {
    const { login, password } = req.body;
    if (!login || !password) {
        return res
            .status(400)
            .json({ success: false, msg: "Campo login e senha são obrigatórios" });
    }
    next();
}
export default userCreate;
//# sourceMappingURL=user-create-middleware.js.map