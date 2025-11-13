function userUpdate(req, res, next) {
    const { name, password } = req.body;
    if (name || password) {
        return next();
    }
    return res
        .status(400)
        .json({ success: false, msg: "Campo nome ou senha são obrigatórios" });
}
export default userUpdate;
//# sourceMappingURL=user-update-middleware.js.map