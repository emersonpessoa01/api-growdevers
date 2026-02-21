import { growdevers } from "./dados.js";

// validateGrowdeverMiddleware - Serve para filtrar os growdevers com base nos query params enviados
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
