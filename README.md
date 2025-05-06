# KomuniUI API
KomuniUI é uma API que visa facilitar a comunicação entre pessoas de uma comunidade local, com funcionalidades para criar avisos, eventos, pedidos e solicitações, e comentários. A API foi desenvolvida para organizar essas informações de maneira simples, eficiente e sem a bagunça de grupos informais de comunicação.

## Tecnologias Utilizadas
Este projeto utiliza as seguintes tecnologias:
- Node.js: Ambiente de execução JavaScript no lado do servidor.
- Express: Framework para Node.js, utilizado para criar as rotas da API.
- Sequelize: ORM (Object Relational Mapping) para interação com o banco de dados SQLite.
- SQLite3: Banco de dados relacional simples e eficiente.
- JWT (JSON Web Token): Utilizado para autenticação de usuários.
- Swagger: Ferramenta de documentação interativa da API.
- Jest: Framework de testes para garantir a qualidade do código.
- Supertest: Biblioteca para testar APIs HTTP.

# Configuração do Projeto
Requisitos
-Node.js versão 16 ou superior.
-NPM (Node Package Manager).

Passo a Passo para Inicializar o Projeto
Clonar o Repositório
Primeiro, clone o repositório para o seu ambiente local:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/komuniui-api.git
cd komuniui-api
Instalar Dependências
Instale todas as dependências necessárias do projeto:

bash
Copiar
Editar
npm install
Configurar o Banco de Dados
O projeto usa o SQLite para armazenar os dados. Ao rodar o projeto pela primeira vez, o banco de dados será criado automaticamente.

Rodar o Projeto
Para iniciar o servidor em modo de desenvolvimento, utilize o comando:

bash
Copiar
Editar
npm run start:dev
Acessar a API
A API estará disponível em http://localhost:3000.

Rodar os Testes
Para rodar os testes unitários, utilize o comando:

bash
Copiar
Editar
npm test
Estrutura de Rotas
A API é estruturada com as seguintes rotas principais:

/users: Rota para gerenciar usuários (criação, login).

/posts: Rota para criar e listar publicações (avisos, eventos).

/comments: Rota para interagir com comentários de publicações.

As rotas são protegidas por autenticação JWT, garantindo a segurança dos dados.

Testes
O projeto possui testes automatizados com Jest. Para rodar os testes, utilize o comando:

bash
Copiar
Editar
npm run test-global
Você também pode rodar testes específicos para usuários, comentários ou postagens:

bash
Copiar
Editar
npm run test-users
npm run test-comments
npm run test-posts
Swagger Documentation
A documentação da API pode ser acessada através do Swagger, que está disponível em:

bash
Copiar
Editar
http://localhost:3000/api-docs
Estrutura do Projeto
app.js: Arquivo principal para inicializar o servidor.

routes/: Contém as rotas da API.

models/: Contém a definição das tabelas do banco de dados usando Sequelize.

tests/: Contém os testes automatizados.

swagger/: Contém a documentação do Swagger.

Considerações Finais
Este projeto foi desenvolvido como parte do Hackateen, com o objetivo de criar uma plataforma simples e eficiente para melhorar a comunicação nas comunidades locais. Ao escolher as tecnologias, buscamos garantir a facilidade de uso, segurança e flexibilidade, permitindo que o sistema cresça conforme as necessidades da comunidade.

Licença
