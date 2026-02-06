import { randomUUID } from "crypto";

export const growdevers = [
  {
    id: randomUUID(),
    nome: "Maria",
    email: "maria@org.com",
    idade: 25,
    matriculado: true,
  },
  {
    id: randomUUID(),
    nome: "João",
    email: "joao@org.com",
    idade: 30,
    matriculado: false,
  },
];
