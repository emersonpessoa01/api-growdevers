import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
import { randomUUID } from "crypto";
import {
  logMiddleware,
  logRequestMiddleware,
  validateGrowdeverMiddleware,
} from "./middlewares.js";

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
app.get(
  "/growdevers",
  [
    logMiddleware,
    logRequestMiddleware,
    validateGrowdeverMiddleware,
  ],
  (req, res) => {
    try {
      // recupera o que middleware guardou
      const dados = req.growdeversFiltrados;
      res.status(200).send({
        ok: true,
        mensagem: "Growdever encontrados",
        dados: dados,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

/* GET /growdevers/:id - Listar growdevers pelo ID */
app.get("/growdevers/:id", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensgem: error.toString(),
    });
  }
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
  try {
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
    growdever.idade = Number(idade);
    growdever.matriculado = matriculado;

    res.status(200).send({
      ok: true,
      mensagem: "Growdever atualizado com sucesso!",
      dados: growdevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

/* PATCH /growdever/:id - */
app.patch("/growdevers/:id", (req, res) => {
  try {
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

    // A MÁGICA para trocar os if´s: Mesclar o quem no body diretamenteno objeto encontrado
    if (req.body.idade)
      req.body.idade = Number(req.body.idade);
    Object.assign(growdever, req.body);

    res.status(200).send({
      ok: true,
      mensagem: "Growdever encontrado com sucesso",
      dados: growdever,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

/* POST  /growdevers - Criar lista de growdevers */
app.post("/growdevers", [logMiddleware], (req, res) => {
  try {
    const { nome, email, idade, matriculado } = req.body;
    // Lista de campos obrigatórios
    const camposObrigatorios = [
      "nome",
      "email",
      "idade",
      "matriculado",
    ];
    // Procura se algum campo está faltando ou vazio
    for (const campo of camposObrigatorios) {
      if (
        req.body[campo] === undefined ||
        req.body[campo] === ""
      ) {
        return res.status(400).json({
          ok: false,
          mensagem: `O campo ${campo} não foi informado`,
        });
      }
    }
    // Verificação de idade mínima
    if (Number(idade) < 18) {
      return res.status(400).json({
        ok: false,
        mensagem:
          "O growdever dever ter no mínimo 18 anos de idade",
      });
    }
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensagem: error.toString(),
    });
  }
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
