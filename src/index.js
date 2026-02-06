// Crie um api rest começando com get
// src/app.js
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

/* Criar nossas rotas */
app.get("/hello", (req, res) => {
  res.json({
    message: "Olá, esta é a API REST!",
  });
});

app.get("/about", (req, res) => {
  res.json({
    nome: "Emerson Pessoa",
    email: "emersonpessoa@growdev.com.br",
    resumo: "Aluno da Growdev",
    idade: 52,
    skills: ["JavaScript", "Node.js", "Express", "React"],
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e http://localhost:${PORT}`);
});
