const express = require("express");
const app = express();

app.use(express.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioModel = require("./src/module/usuario/usuario.model.js");
const noticiaModel = require("./src/module/noticia/noticia.model.js");

app.post("/login", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "O campo e-mail é obrigatório" });
  }

  if (!req.body.senha) {
    return res.status(400).json({ message: "O campo senha é obrigatório" });
  }

  const usuarioExistente = await usuarioModel.findOne({
    email: req.body.email,
  });

  if (!usuarioExistente) {
    return res.status(400).json({ message: "Usuario não está cadastrado" });
  }

  const senhaVerificada = bcrypt.compareSync(
    req.body.senha,
    usuarioExistente.senha
  );

  if (!senhaVerificada) {
    return res.status(400).json({ message: " Email ou senha incorretos" });
  }

  const token = jwt.sign({ _id: usuarioExistente._id }, "token");

  return res
    .status(200)
    .json({ message: "Login realizado com sucesso", token });
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await usuarioModel.find({});
  return res.status(200).json(usuarios);
});

app.post("/usuarios", async (req, res) => {
  if (!req.body.email) {
    return res.status(404).json({ message: "O campo e-mail é obrigatório" });
  }

  if (!req.body.senha) {
    return res.status(404).json({ message: "O campos senha é obrigatório" });
  }

  const usuarioExistente = await usuarioModel.findOne({
    email: req.body.email,
  });

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuario já existe" });
  }

  const senhaCrisptografada = bcrypt.hashSync(req.body.senha, 10);

  const usuario = await usuarioModel.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaCrisptografada,
  });

  return res.status(201).json(usuario);
});

app.get("/noticias", async (req, res) => {
  /**
   * primeiro montamos uma query que pegue a categoria na URL
   * criamos uma variavel para receber estes dados que está vazia 
   * e um if para pegar se algo for colocado
   */
   let filtroCategoria = {}
   if(req.query.categoria){
    filtroCategoria = { categoria: req.query.filtroCategoria}
   }

   /**
    * aqui fazemos um find (busca em mongo) usando categorias como parametro
    */

    const noticias = await noticiaModel.find(filtroCategoria);
  return res.status(200).json(noticias);
});

app.post("/noticias", async (req, res) => {
  if(!req.body.titulo){
    return res.status(400).json({message: "o Campo titulo é obrigatorio"})
  }// montamos um required para as informações 

  if(!req.body.img){
    return res.status(400).json({message: "o Campo imagem é obrigatorio"})
  }// montamos um required para as informações

  if(!req.body.texto){
    return res.status(400).json({message: "o Campo texto é obrigatorio"})
  }// montamos um required para as informações

  if(!req.body.categoria){
    return res.status(400).json({message:"o Campo categoria é obrigatorio"})
  }// montamos um required para as informações


  /**
   * estrutura de envio (criação) de dados na tabela usando o model 
   * e enviando os dados pelo body no formato json
   */
  const noticia = await noticiaModel.create({
    titulo: req.body.titulo,
    img: req.body.img,
    texto: req.body.texto,
    categoria: req.body.categoria
  })
    return res.status(200).json(noticia);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
