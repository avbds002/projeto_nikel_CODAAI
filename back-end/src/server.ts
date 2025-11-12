import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";

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
