const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

/**
 * Model de usuario e inicia a coneceção como o banco
 */
const UsuarioModel = require("./src/module/usuario/usuario.js");
const NoticiaModel = require("./src/module/noticia/noticia.js");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Este campo é obrigatório" }); //validação
  }
  if (!req.body.senha) {
    return res.status(400).json({ message: "Este campo é obrigatório" }); // validação
  }

  const usuarioExistente = await UsuarioModel.findOne({
    email: req.body.email,
  }); // verifica se usuario já existe

  if (!usuarioExistente) {
    return res.status(400).json({ message: "Usuario não esta cadastrado" });
  }

  const senhaVerificada = bcrypt.compareSync(
    req.body.senha,
    usuarioExistente.senha
  );

  if (!senhaVerificada) {
    return res.status(400).json({ message: "E-mail ou senha incorretos" });
  }

  const token = jwt.sign({ _id: usuarioExistente._id }, "dnc"); // criação do token

  return res.status(200).json({ message: "Login realizado com sucesso" });
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await UsuarioModel.find({});
  return res.status(200).json([]);
});

app.post("/usuarios", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Este campo é obrigatório" }); //validação
  }

  if (!req.body.senha) {
    return res.status(400).json({ message: "Este campo é obrigatório" }); // validação
  }

  const usuarioExistente = await UsuarioModel.find({ email: req.body.email }); // verifica se usuario já existe

  if (usuarioExistente.length) {
    return res.status(400).json({ message: "Usuario já cadastrado" });
  }

  const senhaCriptografada = bcrypt.hashSync(res.body.senha, 10); // criptografia da senha

  const usuario = await UsuarioModel.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaCriptografada,
  });

  return res.status(201).json(usuario);
});

app.get("/noticias", (req, res) => {
  return res.status(200).json([]);
});

app.post("/noticias", (req, res) => {
  return res.status(201).json([]);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
