import repository from "../database/repository.js";
async function existTransaction(req, res, next) {
    const id = req.params.id;
    const transaction = await repository.transaction.findUnique({
        where: { id: Number(id) },
    });
    if (transaction) {
        return next();
    }
    return res
        .status(400)
        .json({ success: false, msg: "Transaction não encontrada" });
}
export default existTransaction;
//# sourceMappingURL=transaction-exist-middleware.js.map