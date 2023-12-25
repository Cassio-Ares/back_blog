const mongoose = require('mongoose'); // importamos o mongoose 

mongoose.connect('mongodb://127.0.0.1:27017/local/');  //iniciamos a conexão dizendo mongodb: url / )

module.exports = mongoose;

/**
 * Primeiro passo 
 * intalamos o mongoose : yarn add mongoose
 */