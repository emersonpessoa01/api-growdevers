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
  const { idade, nome, email, email_includes } = req.query;

  // Filtramos em umaúnica passada para ganhar performance
  const dadosFiltrados = growdevers.filter((dado) => {
    const filtroIdade = idade
      ? dado.idade >= Number(idade)
      : true;
    const filtroNome = nome
      ? dado.nome.toLowerCase().includes(nome.toLowerCase())
      : true;
    const filtroEmail = email
      ? dado.email.toLowerCase() === email.toLowerCase()
      : true;
    const filtroEmailIncludes = email_includes
      ? dado.email
          .toLowerCase()
          .includes(email_includes.toLowerCase())
      : true;
    return (
      filtroIdade &&
      filtroNome &&
      filtroEmail &&
      filtroEmailIncludes
    );
  });

  res.status(200).send({
    ok: true,
    mensagem: "Growdever encontrados",
    dados: dadosFiltrados,
  });
});

/* GET /growdevers/:id - Listar growdevers pelo ID */
app.get("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const growdever = growdevers.find(
    (growdever) => growdever.id === id,
  );
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

/* PUT /growdever/:id - Atualizar growdever específico */
app.put("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, idade, matriculado } = req.body;

  const growdever = growdevers.find(
    (growdever) => growdever.id === id,
  );

  if (!growdever) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }

  growdever.nome = nome;
  growdever.email = email;
  growdever.idade = idade;
  growdever.matriculado = matriculado;

  res.status(200).send({
    ok: true,
    mensagem: "Growdever atualizado com sucesso!",
    dados: growdevers,
  });
});

/* PATCH /growdever/:id - Toggle do campo matriculado */
app.patch("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, idade, matriculado } = req.body;
  const growdever = growdevers.find(
    (growdever) => growdever.id === id,
  );
  if (!growdever) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }

  // Lógica de alteraçã:sómuaseo valorfor enviado no body
  if (nome) growdever.nome = nome;
  if (email) growdever.email = email;
  if (idade) growdever.idade = idade;

  // Para booleanos, checa se não é undefined (pois false é um valor válido)

  if (matriculado !== undefined) {
    growdever.matriculado = matriculado;
  }

  res.status(200).send({
    ok: true,
    mensagem: "Growdever encontrado com sucesso",
    dados: growdever,
  });
});

/* POST  /growdevers - Criar lista de growdevers */
app.post("/growdevers", (req, res) => {
  const { nome, email, idade, matriculado } = req.body;
  const novoGrowdever = {
    id: randomUUID(),
    nome,
    email,
    idade,
    matriculado: true,
  };

  growdevers.push(novoGrowdever);
  res.status(201).send({
    ok: true,
    mensagem: "Growdever criado com sucesso!",
    growdever: novoGrowdever,
  });
});

/* DELETE /growdevers/:id - Deletar um growdever */
app.delete("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const index = growdevers.findIndex(
    (growdever) => growdever.id === id,
  );
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
  console.log(
    `Servidor rodando na porta ${PORT} e http://localhost:${PORT}`,
  );
});
