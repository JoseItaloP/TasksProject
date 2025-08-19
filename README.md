# To-do List
<img width="1246" height="986" alt="image" src="https://github.com/user-attachments/assets/09f472dc-3f14-4098-87e2-af2e2405c2f3" />


## Descrição
Este projeto é um WebSite feito para organizar lista de tarefas (To-do List), com capacidade de criar, editar e deletar tarefas do usuário, para que qualquer um possa organizar suas tarefas de uma forma mais eficiente.
Projeto feito com objetivo de explorar e aprofundar o conhecimento em arquitetura de software End-to-End (E2E), criando uma estrutura robusta capaz de atender todas as necessidades do usuário.

## Tecnologias
Projeto feito com as seguintes tecnologias: 
### Frontend
  - Next.js: Framework React para renderização do lado do servidor e otimização.
  - TypeScript: Para tipagem estática e maior segurança no desenvolvimento.
  - Tailwind CSS: Framework de estilização utilitário para um design rápido e responsivo.
  - React Icons: Biblioteca de ícones para a interface do usuário.
  - Nookies: Gerenciamento de cookies para autenticação.
### BackEnd
  - Node.js: Ambiete de execução
  - Fastify: Framework web de alta performace
  - Prisma: ORM para banco de dados
  - Zod: Validação de schemas
  - jasonwebtoken. Validação de token de acesso (JWT)
  - Nodemailer: Envio de e-mail para criação e recuperação de senha
  - MongoDB: Banck de dados NoSQL para persistencias dos dados
### Testes
  - Jest: framework de testes para testes unitario e de integração.
  - Testing Library Utilities para testar componentes essenciais do React

## Instalação
Para executar o projeto em sua maquina, siga os passos abaixo ou entre no link via Vercel aberto para testar a aplicação agora mesmo.

 - LINK Front End   - https://tasks-project-alpha.vercel.app/
 - LINK Back End    - https://tasks-project-backendjff1.vercel.app/docs

### Pré-requisitos
  - Node(v20 ou superior)
  - npm ou yarn
  - Acesso a uma instancia própria do MongoDB(Acesse o backeEnd do projeto)

### 1. Clone o repositório:
``` bash
    git clone https://github.com/JoseItaloP/TasksProject
```
### 2. Crie e configure o arquivo de ambiente na pasta FrontEnd:
   - Crie um arquivo .env.local na raiz do projeto
   - Adiciones as variáveis
```bash
    DATABASE_URL="adicione aqui sua instância do MongoDB"
    FRONT_URL="*" 
    TESTING_ENV="false"
    ON_VERCEL="NO"
```

### 3. Crie e configure o arquivo de ambiente na pasta BackEnd:
   - Crie um arquivo .env.local na raiz do projeto
   - Adiciones as variáveis
```bash
    API_URL="http://localhost:3333"
    JWT_PASS=" cria um conjunto de 72 caracteres aleatorio "
```
### Executando o projeto
#### 1. Instalando as dependências
  execute o comando
  ```bash
  npm install ou yarn install
  ```
  dentro de cada pasta, FrontEnd e Backend
  
  #### 2. Inicie o servidor de desenvolvimento
  execute o comando
  ```bash
  npm install ou yarn install
  ```
  dentro de cada pasta, FrontEnd e Backend

  ### Teste
  #### FrontEnd
  Execute o comando
  ```bash
  npm run test ou yarn run test
  ```

#### BackEnd
Sera necessario adicionar um arquivo de .env.test na raiz da pasta BackEnd com:
```bash
DATABASE_URL="Sua instância do mongoDB para teste"
FRONT_URL="*" 
TESTING_ENV="true"
ON_VERCEL="NO"
```
Execute o comando abaixo para iniciar o teste
```bash
npm run test ou yarn run test
```
