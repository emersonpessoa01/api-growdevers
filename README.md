## 🚀 API Growdevers

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

API REST desenvolvida para gerenciamento de alunos (Growdevers),
permitindo operações completas de CRUD (Create, Read, Update, Delete),
com filtros avançados e validações robustas via middlewares.

------------------------------------------------------------------------

## 📌 Visão Geral

Esta API foi construída com foco em:

-   Arquitetura limpa e organizada
-   Separação de responsabilidades
-   Validações robustas
-   Padrão RESTful
-   Código escalável e legível

------------------------------------------------------------------------

## 🛠️ Stack Tecnológica

-   **Node.js**
-   **Express**
-   **CORS**
-   **Dotenv**
-   **UUID (randomUUID)**
-   **Nodemon**
-   **Prettier + prettier-plugin-jsdoc**
-   **ES Modules (import/export)**

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

``` text
API-GROWDEVERS/
├── src/
│   ├── dados.js
│   ├── index.js
│   └── middlewares.js
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

------------------------------------------------------------------------

## 🚀 Instalação

``` bash
git clone <repo-url>
cd API-GROWDEVERS
npm install
```

Configure o `.env` baseado no `.env.example`.

Execute em modo desenvolvimento:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 📌 Endpoints

### 🔎 Listar Growdevers

``` http
GET /growdevers
```

#### Filtros disponíveis:

-   `?nome=`
-   `?email=`
-   `?idade=`

------------------------------------------------------------------------

### 🔍 Buscar por ID

``` http
GET /growdevers/:id
```

------------------------------------------------------------------------

### ➕ Criar Growdever

``` http
POST /growdevers
```

Body:

``` json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 22,
  "matriculado":true
}
```

------------------------------------------------------------------------

### ✏️ Atualização Total

``` http
PUT /growdevers/:id
```

------------------------------------------------------------------------

### 🩹 Atualização Parcial

``` http
PATCH /growdevers/:id
```

------------------------------------------------------------------------

### ❌ Remover

``` http
DELETE /growdevers/:id
```

------------------------------------------------------------------------

## 🧪 Exemplos de Requisição

## 🔹 cURL

``` bash
curl -X POST http://localhost:3000/growdevers \
-H "Content-Type: application/json" \
-d '{"nome":"Maria","email":"maria@email.com","idade":20}'
```

------------------------------------------------------------------------

## 🔹 Fetch (Frontend)

``` javascript
fetch("http://localhost:3000/growdevers", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nome: "Maria",
    email: "maria@email.com",
    idade: 20
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

------------------------------------------------------------------------

## 🔹 Insomnia / Postman

1.  Método: **POST**
2.  URL: `http://localhost:3000/growdevers`
3.  Body: JSON
4.  Enviar payload conforme exemplo acima

------------------------------------------------------------------------

## 🛡️ Middlewares

### verificarCamposObrigatoriosMiddleware

Valida presença dos campos obrigatórios e idade mínima (18 anos).

### verificarExistenciaGrowdeverMiddleware

Verifica se o ID existe e injeta o objeto encontrado em
`req.growdeverEncontrado`.

### validateGrowdeverMiddleware

Permite filtragem avançada via Query Params.

------------------------------------------------------------------------

## 📊 Boas Práticas Aplicadas

-   Estrutura modular
-   Validação centralizada
-   Separação de responsabilidades
-   Código padronizado com Prettier
-   Uso de variáveis de ambiente

------------------------------------------------------------------------

## 🤝 Contribuição

1.  Fork o projeto
2.  Crie uma branch (`git checkout -b feature/minha-feature`)
3.  Commit suas alterações
4.  Push para sua branch
5.  Abra um Pull Request

------------------------------------------------------------------------

## 📄 Licença

Este projeto está sob a licença MIT.

------------------------------------------------------------------------

## 👨‍💻 Autor

### Instrutora: @leticialeal

✒️ Desenvolvido por Emerson Pessoa <br>
[Linkedin](https://www.linkedin.com/in/emersonpessoa01/) — Desenvolvedor em constante evolução 🚀
