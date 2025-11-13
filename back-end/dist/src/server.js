import "dotenv/config";
import express, {} from "express";
import cors from "cors";
import { UserController } from "./controllers/user-controller.js";
import userCreate from "./middleware/user-create-middleware.js";
import userUpdate from "./middleware/user-update-middleware.js";
import existUser from "./middleware/user-exist-middleware.js";
import { TransactionController } from "./controllers/transactions-controller.js";
import transactionCreate from "./middleware/transaction-create-middleware.js";
import existTransaction from "./middleware/transaction-exist-middleware.js";
import transactionUpdate from "./middleware/transaction-update-middleware.js";
const app = express();
const PORT = 3333;
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
app.get("/test", (req, res) => {
    res.status(200).json({ success: true, msg: "Aplicação rodando" });
});
const controllerUser = new UserController();
const controllerTransaction = new TransactionController();
//user routes
app.get("/users", controllerUser.index);
app.get("/users/:id", existUser, controllerUser.show);
app.post("/users", userCreate, controllerUser.create);
app.delete("/users/:id", existUser, controllerUser.delete);
app.put("/users/:id", [userUpdate, existUser], controllerUser.update);
//transaction routes
app.get("/transactions", controllerTransaction.index);
app.get("/transactions/:id", existTransaction, controllerTransaction.show);
app.post("/transactions", transactionCreate, controllerTransaction.create);
app.delete("/transactions/:id", existTransaction, controllerTransaction.delete);
app.put("/transactions/:id", [transactionUpdate, existTransaction], controllerTransaction.update);
//# sourceMappingURL=server.js.map