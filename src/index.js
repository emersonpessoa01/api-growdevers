import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
dotenv.config();

const app = express();
app.use(express.json());

/* Criar nossas rotas */
/* GET /growdevers - listar growdevers */
app.get("/growdevers", (req, res) => {
  res.status(200).json({
    ok: true,
    mensagem: "Lista de growdevers",
    growdevers,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e http://localhost:${PORT}`);
});
