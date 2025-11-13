function transactionCreate(req, res, next) {
    const { value, date, type, description } = req.body;
    if (!value || !date || !type || !description) {
        return res
            .status(400)
            .json({
            success: false,
            msg: "Transação inválida, erro nos campos da transação",
        });
    }
    next();
}
export default transactionCreate;
//# sourceMappingURL=transaction-create-middleware.js.map