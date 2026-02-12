import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();
app.use(express.json());

/* Criar nossas rotas */
/* GET /growdevers - listar growdevers */
// app.get("/growdevers", (req, res) => {
//   res.status(200).send({
//     ok: true,
//     mensagem: "Lista de growdevers",
//     growdevers,
//   });
// });

/* Filtros comQuery Params */
/* GET growdever?params="value" */
app.get("/growdevers", (req, res) => {
  const { idade, nome } = req.query;

  let dados = growdevers;
  if (idade) {
    dados = dados.filter((dado) => dado.idade === Number(idade));
  }

  if (nome) {
    dados = dados.filter(( dado ) => dado.nome.includes(nome));
  }

  res.status(200).send({
    ok: true,
    mensagem: "Growdever listado com sucesso",
    dados,
  });
});

/* GET /growdevers/:id - Listar growdevers pelo ID */
app.get("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const growdever = growdevers.find((growdever) => growdever.id === id);
  if (!growdever) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }
  res.status(200).send({
    ok: true,
    mensagem: "Growdever encontrado com sucesso!",
    dados: growdever,
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
    matricula: true,
  };

  growdevers.push(novoGrowdever);
  res.status(201).send({
    ok: true,
    mensagem: "Growdever criado com sucesso!",
    growdever: novoGrowdever,
  });
});

/* PUT /growdevers/:id - Atualizar um growdever */

/* DELETE /growdevers/:id - Deletar um growdever */
app.delete("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const index = growdevers.findIndex((growdever) => growdever.id === id);
  if (index === -1) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }
  growdevers.splice(index, 1);
  res.status(200).json({
    ok: true,
    mensagem: "Growdever deletado com sucesso!",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e http://localhost:${PORT}`);
});
