import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { UserController } from "./controllers/user-controller.js";
import userCreate from "./middleware/user-create-middleware.js";
import userUpdate from "./middleware/user-update-middleware.js";
import existUser from "./middleware/user-exist-middleware.js";

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: "Aplicação rodando" });
});

const controllerUser = new UserController();

app.get("/users", controllerUser.index);
app.get("/users/:id", existUser, controllerUser.show);
app.post("/users", userCreate, controllerUser.create);
app.delete("/users/:id", existUser, controllerUser.delete);
app.put("/users/:id", [userUpdate, existUser], controllerUser.update);
