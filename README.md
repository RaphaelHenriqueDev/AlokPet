# 🐾 AlokPet

**AlokPet** é uma plataforma web voltada para serviços e produtos pet, desenvolvida como parte de um projeto acadêmico.  
Seu objetivo é facilitar o acesso de tutores a lojas e prestadores de serviços especializados, promovendo uma experiência digital prática, segura e eficiente.

## 🌟 Visão Geral

A aplicação permite que usuários naveguem por uma variedade de produtos e serviços para animais de estimação, façam pedidos online e recebam em casa.  
Com uma interface intuitiva, o AlokPet também oferece ferramentas para gerenciamento de pedidos e autenticação de usuários.

## 🔧 Tecnologias Utilizadas

- **Node.js** + **Express** — servidor e rotas
- **MongoDB** — banco de dados NoSQL
- **EJS (Embedded JavaScript)** — mecanismo de templates para renderização de páginas
- **Bootstrap** — estilização e responsividade
- **Mongoose** — ODM para interação com o MongoDB

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/RaphaelHenriqueDev/AlokPet.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd AlokPet
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente em um arquivo `.env`, conforme necessário:
   ```env
   MONGO_URI=seu_link_do_mongodb
   PORT=3000
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

6. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## 📁 Estrutura de Pastas (Simplificada)

```
AlokPet/
├── models/          # Modelos do MongoDB (usuários, produtos, etc.)
├── routes/          # Definição das rotas da aplicação
├── views/           # Templates EJS
├── public/          # Arquivos estáticos (CSS, JS, imagens)
├── app.js           # Arquivo principal do servidor
└── .env             # Variáveis de ambiente
```

## 📌 Status do Projeto

> ✅ **Em desenvolvimento** — funcionalidades principais implementadas. Melhorias futuras em andamento.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

## 🤝 Contribuições

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir *issues* ou enviar *pull requests* com melhorias, correções ou sugestões.

## 👥 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/RaphaelHenriqueDev" target="_blank">
  <img src="https://avatars.githubusercontent.com/u/118121678?v=4&s=100" width="100px" alt="Raphael Henrique" /><br />
  <sub><b>Raphael Henrique</b></sub>
</a>
    </td>
    <!-- Adicione mais contribuidores aqui, se necessário -->
         <td align="center">
      <a href="https://github.com/LePignatari" target="_blank">
  <img src="https://avatars.githubusercontent.com/u/118121678?v=4&s=100" width="100px" alt="LePignatari" /><br />
  <sub><b>Letícia Pignatari</b></sub>
</a>
    </td>
  </tr>
</table>

## ✉️ Contato

Desenvolvido por [Raphael Henrique](https://github.com/RaphaelHenriqueDev)  
Caso tenha dúvidas, sugestões ou queira colaborar, fique à vontade para entrar em contato!
