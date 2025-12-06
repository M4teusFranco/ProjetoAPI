# Controle de Despesas – Angular + Node.js + MongoDB

### 📋 Descrição do Projeto

Este projeto consiste em um **sistema de controle financeiro pessoal**, permitindo o **cadastro, listagem e exclusão de receitas e despesas**, organizado por **categoria, data e valor**.

A aplicação é dividida em **frontend** e **backend**, utilizando uma arquitetura moderna baseada em API REST.


Para visualizar o repositório da API do node, segue link: https://github.com/M4teusFranco/ProjetoAPI_Node.git

---

### 🧱 Estrutura do Sistema

#### Frontend (Angular)
- Interface web para cadastro e visualização das movimentações financeiras
- Formulário para inclusão de receitas e despesas
- Listagem dinâmica com atualização em tempo real
- Comunicação com a API via `HttpClient`

#### Backend (Node.js + Express)
- API REST responsável pelo controle das movimentações
- CRUD completo (Create, Read, Update, Delete)
- Validações de dados
- Integração com banco de dados MongoDB

#### Banco de Dados (MongoDB)
- Armazena as movimentações financeiras
- Classificação por:
  - Tipo (receita ou despesa)
  - Categoria
  - Data
  - Valor
- Uso de Mongoose para modelagem dos dados

---

### 🗂️ Modelo de Dados – Despesa / Receita

Cada movimentação possui os seguintes campos:
- `tipo`: receita ou despesa
- `categoria`: classificação da movimentação
- `descricao`: descrição opcional
- `valor`: valor monetário
- `data`: data da movimentação
- `createdAt` e `updatedAt` (automáticos)

---

### 🔧 Tecnologias Utilizadas

#### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- Angular Forms

#### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Cors
- Dotenv

---

### 🔧 Pré-requisitos

- Node.js 18 ou superior
- Angular CLI
- MongoDB Atlas ou MongoDB local
- Git

---

## ✒️ Autores * **Mateus Franco Bezerra** - ProjetoAPI
