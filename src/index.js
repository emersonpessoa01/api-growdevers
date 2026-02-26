import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
import { randomUUID } from "crypto";
import {
  validateGrowdeverMiddleware,
  verificarCamposObrigatoriosMiddleware,
  verificarExistenciaGrowdeverMiddleware,
} from "./middlewares.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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
  [validateGrowdeverMiddleware],
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
app.get(
  "/growdevers/:id",
  [verificarExistenciaGrowdeverMiddleware],
  (req, res) => {
    const growdever = req.growdeverEncontrado;
    res.status(200).send({
      ok: true,
      mensagem: "Growdever encontrado com sucesso!",
      dados: growdever,
    });
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

/* PUT /growdever/:id - Atualizar growdever específico */
app.put(
  "/growdevers/:id",
  [
    validateGrowdeverMiddleware,
    verificarCamposObrigatoriosMiddleware,
    verificarExistenciaGrowdeverMiddleware,
  ],
  (req, res) => {
    try {
      const growdever = req.growdeverEncontrado;
      const { nome, email, idade, matriculado } = req.body;

      growdever.nome = nome;
      growdever.email = email;
      growdever.idade = Number(idade);
      growdever.matriculado = matriculado;

      res.status(200).send({
        ok: true,
        mensagem: "Growdever atualizado com sucesso!",
        dados: growdever,
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

/* PATCH /growdever/:id - */
app.patch(
  "/growdevers/:id",
  [verificarExistenciaGrowdeverMiddleware],
  (req, res) => {
    try {
      const growdever = req.growdeverEncontrado;

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
  },
);

/* POST  /growdevers - Criar lista de growdevers */
app.post(
  "/growdevers",
  [verificarCamposObrigatoriosMiddleware],
  (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(500).json({
        mensagem: error.toString(),
      });
    }
  },
);

/* DELETE /growdevers/:id - Deletar um growdever */
app.delete(
  "/growdevers/:id",
  [verificarExistenciaGrowdeverMiddleware],
  (req, res) => {
    // Pegando o growdever encontrado pelo middleware
    const growever = req.growdeverEncontrado;

    // Descobrindo em qual posição(índice) esse objeto específico está
    const index = growdevers.indexOf(growever);

    growdevers.splice(index, 1);
    res.status(200).json({
      ok: true,
      mensagem: "Growdever deletado com sucesso!",
    });
  },
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT} e http://localhost:${PORT}`,
  );
});
