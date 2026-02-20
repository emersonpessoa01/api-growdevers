import { growdevers } from "./dados.js";

export const logMiddleware = (req, res, next) => {
  console.log("Hello Middleware");
  next();
};

export const logRequestMiddleware = (req, res, next) => {
  console.log(req.query);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.url);
  console.log(req.body);

  next();
};

export const validateGrowdeverMiddleware = (
  req,
  res,
  next,
) => {
  try {
    const { idade, nome, email, email_includes } =
      req.query;

    // Filtramos em uma única passada para ganhar performance
    const dadosFiltrados = growdevers.filter((dado) => {
      const filtroIdade = idade
        ? dado.idade >= Number(idade)
        : true;
      const filtroNome = nome
        ? dado.nome
            .toLowerCase()
            .includes(nome.toLowerCase())
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
    // Guarda o dados dentroo objeto req
    req.growdeversFiltrados = dadosFiltrados;
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensagem: error.toString(),
    });
  }

  next();
};

// Verifica se os campos obrigatórios foram enviados (usado no POST e PUT)
export const verificarCamposObrigatoriosMiddleware = (
  req,
  res,
  next,
) => {
  try {
    const { nome, email, idade, matriculado } = req.body;
    const campos = [
      "nome",
      "email",
      "idade",
      "matriculado",
    ];

    for (const campo of campos) {
      if (
        req.body[campo] === undefined ||
        req.body[campo] === ""
      ) {
        return res.status(400).json({
          ok: false,
          mensagem: `O campo ${campo} é obrigatório.`,
        });
      }
    }

    if (Number(idade) < 18) {
      return res.status(400).json({
        ok: false,
        mensagem: "O growdever deve ter no mínimo 18 anos.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensagem: error.toString(),
    });
  }
};

// Verifica se o ID passado na URL existe (usado no GET/:id, PUT, PATCH, DELETE)
export const verificarExistenciaGrowdeverMiddleware = (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const growdever = growdevers.find((g) => g.id === id);

  if (!growdever) {
    return res.status(404).json({
      ok: false,
      mensagem: "Growdever não encontrado.",
    });
  }

  // Passando o growdever encontrado adiante para a rota não precisar buscar de novo
  req.growdeverEncontrado = growdever;
  next();
};
