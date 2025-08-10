=# Task Manager Frontend 🖥️

Interface web para gerenciar tarefas, consumindo a API backend protegida por JWT.

---

## 🚀 Tecnologias

- React 18
- Vite
- TypeScript
- Fetch API

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── api/            # Funções para comunicação com a API
├── components/     # Componentes reutilizáveis (Formulários, Listas etc)
├── pages/          # Páginas principais da aplicação (Login, Dashboard)
├── types/          # Tipos e interfaces TypeScript
└── App.tsx         # Componente raiz
````
⚙️ Instalação e Execução

    1. Clone este repositório ou copie os arquivos para seu projeto.

    2. Instale as dependências:

```plaintext
npm install
````

    3. Execute a aplicação em modo de desenvolvimento:

```plaintext
npm run dev
````
    Acesse no navegador:

http://localhost:5173

🔧 Configuração da API

    Certifique-se que a URL da API backend está configurada corretamente no arquivo src/api/index.ts (ou onde estiver sua camada de chamadas HTTP).

Exemplo:

export const API_URL = "http://localhost:8080";

    O token JWT gerado no login deve ser armazenado no localStorage e enviado no header Authorization em todas as requisições protegidas.

📌 Funcionalidades

    Registro e login de usuário

    Listagem, criação, edição e exclusão de tarefas

    Proteção de rotas via token JWT

    Feedback ao usuário sobre erros (ex: token inválido, falha na conexão)

📖 Referências úteis

    React Docs

    Vite Docs

    TypeScript Docs

    Fetch API
