/**
 * const mongoose = require('../config/mongo.js'); 
 * aqui trazemos a conexão com o banco de dados e trazemos o mongoose
 * sendo assim no momento que o schema acionar ele já faz a conexão com o banco de dados
 */   
const mongoose = require('../../config/mongo.js'); 


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

  
    const UsuarioModel = mongoose.model('usuarios', usuarioSchema);

  module.exports = UsuarioModel;  // forma certa de exportar um model