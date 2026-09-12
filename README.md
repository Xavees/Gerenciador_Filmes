
````markdown
# 🎬 Movies REST API

API REST desenvolvida com **Node.js, Express, TypeScript e MongoDB** para praticar conceitos de desenvolvimento Back-end, comunicação HTTP, arquitetura de APIs e operações CRUD.

O projeto permite cadastrar, consultar, atualizar e remover filmes através de endpoints HTTP.

---

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Express Validator
- Morgan
- Postman

---

## 📚 Conceitos praticados

Durante o desenvolvimento deste projeto foram aplicados conceitos como:

- API REST
- HTTP Request e Response
- Métodos HTTP
- Rotas e Endpoints
- Path Parameters
- JSON
- Controllers
- Models
- Middlewares
- Validação de dados
- Tratamento de erros
- Status HTTP
- Logs
- Integração com MongoDB
- Operações CRUD

---

## 📁 Estrutura

```text
├── config/
│   ├── db.ts
│   ├── default.ts
│   └── logger.ts
│
├── logs/
│
├── src/
│   ├── controllers/
│   │   └── movieControllers.ts
│   │
│   ├── middleware/
│   │   ├── handleValidation.ts
│   │   ├── morganMiddleware.ts
│   │   └── movieValidation.ts
│   │
│   ├── models/
│   │   └── Movie.ts
│   │
│   ├── app.ts
│   └── router.ts
│
├── .env
├── package.json
└── tsconfig.json
````

---

## 🎥 Modelo de Filme

Exemplo de objeto utilizado pela API:

```json
{
  "title": "Resident Evil",
  "rating": 8,
  "description": "Filme de terror",
  "director": "Diretor",
  "stars": ["Ator 1", "Ator 2"],
  "poster": "https://exemplo.com/poster.jpg"
}
```

---

## 🛣️ Endpoints

### Criar filme

```http
POST /api/movie
```

Cria um novo filme.

---

### Listar filmes

```http
GET /api/movie
```

Retorna todos os filmes cadastrados.

---

### Buscar filme por ID

```http
GET /api/movie/:id
```

Retorna um filme específico através do seu ID.

---

### Atualizar filme

```http
PATCH /api/movie/:id
```

Atualiza os dados de um filme existente.

---

### Remover filme

```http
DELETE /api/movie/:id
```

Remove um filme através do seu ID.

---

### Testar API

```http
GET /api/test
```

Endpoint utilizado para verificar se a API está funcionando.

---

## 🔄 CRUD

| Operação   | Método | Endpoint         |
| ---------- | ------ | ---------------- |
| Create     | POST   | `/api/movie`     |
| Read       | GET    | `/api/movie`     |
| Read by ID | GET    | `/api/movie/:id` |
| Update     | PATCH  | `/api/movie/:id` |
| Delete     | DELETE | `/api/movie/:id` |

---

## ⚙️ Executando o projeto

Clone o repositório:

```bash
git clone <URL-DO-REPOSITORIO>
```

Entre na pasta:

```bash
cd Express-Node-TypeScript-API
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente necessárias para a conexão com o MongoDB.

Depois execute o projeto utilizando o script configurado no `package.json`.

Exemplo:

```bash
npm run dev
```

A API ficará disponível, por padrão, em:

```text
http://localhost:3000
```

---

## 🧪 Testando a API

Os endpoints podem ser testados utilizando o **Postman** ou qualquer outro cliente HTTP.

Fluxo básico da aplicação:

```text
Cliente / Postman
       ↓
HTTP Request
       ↓
Router
       ↓
Middleware / Validação
       ↓
Controller
       ↓
Mongoose
       ↓
MongoDB
       ↓
HTTP Response
       ↓
Cliente / Postman
```

---

## 🎯 Objetivo

Este projeto foi desenvolvido com finalidade de estudo para compreender, na prática, como uma **API REST** funciona antes de avançar para frameworks Back-end mais estruturados.

O foco principal foi compreender o fluxo completo de uma requisição, desde sua chegada através de uma rota até a comunicação com o banco de dados e o retorno da resposta HTTP.

---

## 👨‍💻 Autor

**Luis Fernando Almeida**

GitHub: **Xavees**

```

Esse README é legal pro seu GitHub justamente porque não tenta vender o projeto como um sistema gigantesco. Ele deixa claro que é um **projeto de estudo**, mas mostra a quantidade de conceito de backend que você aplicou nele.

E o trecho do fluxo `Postman → Router → Middleware → Controller → Mongoose → MongoDB` é especialmente bom, porque resume exatamente **o que você acabou de aprender nesse projeto**. 🧠🔥 
```
