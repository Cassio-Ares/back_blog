const mongoose = require('../../config/mongo.js')
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nome: String,
    email: String,
    senha: String,
  },
  {
    timestamps: true,
  }
);


const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = UsuarioModel;
