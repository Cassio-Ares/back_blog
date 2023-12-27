const express = require("express");
const app = express();

app.use(express.json()); // facilita uso de json (IMPORTANTE)

const bcrypt = require("bcrypt"); // importação do bcrypt que irá criar a criptografia de nossas senhas
const jwt = require("jsonwebtoken"); // importação do jwt que irá criar um token 


const usuarioModel = require("./src/module/usuario/usuario.model.js"); // aqui trazemos model de usuario e iniciamos a conexão

// IMPORTANTE olhas schema de usuario para ver como conexão foi feita.

app.post("/login", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "O campo e-mail é obrigatório" });
  } // regra para tornar o campo required (se req.boby.email não existir mande a msg)

  if (!req.body.senha) {
    return res.status(400).json({ message: "O campo senha é obrigatório" });
  } // regra para tornar o campo required (se req.boby.email não existir mande a msg)

  const usuarioExistente = await usuarioModel.findOne({ email: req.body.email })
  // regra que irá buscar dentro de email no nosso back usando findOne de email já existe

  if (!usuarioExistente) {
    return res.status(400).json({ message: "Usuario não está cadastrado" });
  }// regra para informar caso e-mail não seja cadastrado

  const senhaVerificada = bcrypt.compareSync( req.body.senha, usuarioExistente.senha )
  // regra que irá buscar dentro de usuarioExistente.senha a hash da senha e descriptografar para ver se senha bate

  if(!senhaVerificada){
    return res.status(400).json({ message: " Email ou senha incorretos" });
  }// se senha for errada !senhaexistente (msg)

  const token = jwt.sign({_id: usuarioExistente._id}, "token")
  /*token de altenticação é um cracha que podemos carregar para identificar o usuario
  aqui usamos o _id para criar o token {_id: usuarioExistente._id}*/
  

 return res.status(200).json({ message: "Login realizado com sucesso", token});
 //confirmamos o login e passamos o token para seu usado no front caso nescessario
  
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await usuarioModel.find({});
  return res.status(200).json(usuarios);
});

app.post("/usuarios", async (req, res) => {
  if (!req.body.email) {
    return res.status(404).json({ message: "O campo e-mail é obrigatório" });
    // regra para tornar o campo required (se req.boby.email não existir mande a msg)
  }

  if (!req.body.senha) {
    return res.status(404).json({ message: "O campos senha é obrigatório" });
    // regra para tornar o campo required (se req.body.senha não existir mande a msg)
  }

  const usuarioExistente = await usuarioModel.findOne({
    email: req.body.email,
  });
  //verificação se usuario já existe fazendo um findOne na tabela usuario buscando o email

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuario já existe" });
  }

  const senhaCrisptografada = bcrypt.hashSync(req.body.senha, 10);
  //criptografia da senha usando o bcrypt

  const usuario = await usuarioModel.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaCrisptografada,
    //segurança pois enviamos a senha criptografada para o banco
  });
  // cadastro de novo usuario usuando o create metodo do mongodb
  return res.status(201).json(usuario);
});

app.get("/noticias", (req, res) => {
  return res.status(200).json([]);
});

app.post("/noticias", (req, res) => {
  return res.status(200).json([]);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
