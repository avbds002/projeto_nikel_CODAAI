import "dotenv/config";
import express, {} from "express";
import cors from "cors";
import { UserController } from "./controllers/user-controller.js";
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
app.get("/users", controllerUser.index);
app.get("/users/:id", controllerUser.show);
app.post("/users", controllerUser.create);
app.delete("/users/:id", controllerUser.delete);
app.put("/users/:id", controllerUser.update);
//# sourceMappingURL=server.js.map