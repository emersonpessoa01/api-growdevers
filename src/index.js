// Crie um api rest começando com get
// src/app.js
import express from "express";
const app = express();
export default app;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Olá, esta é a API REST!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e http://localhost:${PORT}/api`);
});
