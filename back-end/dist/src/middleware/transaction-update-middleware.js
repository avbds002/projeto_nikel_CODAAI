function transactionUpdate(req, res, next) {
    const { value, date, type, description } = req.body;
    if (value || date || type || description) {
        next();
    }
    return res
        .status(400)
        .json({ success: false, msg: "Não foi possível atualizar a transação!" });
}
export default transactionUpdate;
//# sourceMappingURL=transaction-update-middleware.js.map