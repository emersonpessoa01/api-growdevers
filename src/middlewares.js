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
