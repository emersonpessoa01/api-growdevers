import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
import { randomUUID } from "crypto";


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

/* POST  /growdevers - Criar lista de growdevers */
app.post("/growdevers", (req, res) => {
  const { nome, email, idade } = req.body;
  const novoGrowdever = {
    id: randomUUID(),
    nome,
    email,
    idade,
    matricula:true,
  };

  growdevers.push(novoGrowdever);
  res.status(201).json({
    ok: true,
    mensagem: "Growdever criado com sucesso!",
    growdever: novoGrowdever,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e http://localhost:${PORT}`);
});
