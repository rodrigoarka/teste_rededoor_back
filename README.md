# Locadora de Filmes - API
Esta é uma API desenvolvida para gerenciar a locadora de filmes, onde é possível listar filmes, reservar filmes, confirmar locação e devolver filmes. A aplicação foi construída com Node.js, Express e MySQL, e utiliza Sequelize como ORM. Também está configurada para rodar com Docker.

Requisitos
Para rodar esta aplicação localmente, você precisará dos seguintes requisitos:

Node.js (v18 ou superior)
MySQL
Docker (para rodar via Docker)
Git
Tecnologias Utilizadas
Node.js
Express
Sequelize
MySQL
Docker
Docker Compose
Instalação
Passo 1: Clone o Repositório
Primeiro, clone este repositório para o seu ambiente local:

bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Passo 2: Configuração do Banco de Dados
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

bash
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=locadora
DB_PORT=3306
PORT=3000
Substitua as variáveis de banco de dados de acordo com sua configuração local.

Passo 3: Instalar Dependências
Instale as dependências do projeto usando npm:

bash
Copiar código
npm install
Passo 4: Rodando com Docker (Opcional)
Para rodar a aplicação com Docker, certifique-se de que o Docker e o Docker Compose estão instalados, e execute:

bash
Copiar código
docker compose up --build
Isso iniciará os contêineres do servidor e do MySQL. A aplicação estará acessível em http://localhost:3000.

Passo 5: Rodar Localmente (Sem Docker)
Se preferir rodar a aplicação sem o Docker, siga os passos abaixo:

Rodar o banco de dados MySQL localmente: Certifique-se de que o MySQL está rodando na sua máquina e que você criou o banco de dados necessário.

Você pode criar o banco de dados locadora com o seguinte comando no MySQL:

sql
Copiar código
CREATE DATABASE locadora;
Rodar a aplicação:

bash
Copiar código
node app.js
A aplicação estará disponível em http://localhost:3000.

Passo 6: Testes
Os testes unitários e de integração podem ser rodados com o seguinte comando:

bash
Copiar código
npm test
Rotas da API
Listar filmes: GET /filmes
Reservar filme: POST /filmes/reservar
Payload:
json
Copiar código
{
  "movieId": "guid"
}
Confirmar locação: POST /filmes/confirmar-locacao
Devolver filme: POST /filmes/devolver
Contribuindo
Se você deseja contribuir com este projeto, faça um fork do repositório, crie um branch, faça suas alterações e envie um pull request.

Faça o fork do projeto
Crie um branch para suas alterações: git checkout -b minha-alteracao
Faça o commit das suas alterações: git commit -m 'Adicionei nova funcionalidade'
Faça o push para o branch: git push origin minha-alteracao
Envie um pull request
Licença
Este projeto está licenciado sob a licença MIT.


