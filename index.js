const express = require('express');  
const app = express();               

app.use(express.json());

/**
 * vamos criar as rotas aqui no index mas normalmente se cria as rotas em uma 
 * pasta chamada routes
 */


/**
 * Estrutura basica de uma rota:
 * 
 * app.get('/', function(req, res){
 *  return res ou req . status ()....
 * }
 * 
 * app (chama o express). get(aqui citamos o verbo de ação get, post, delet, put)
 * ('/ e o nome da rota', função (res(resposta), req(requisição)) =>{
 *    return(toda função retorna algo) este retorno tem um status(). uma forma de comunicação ex: json
 * })
 * 
 */
app.get('/usuarios', (req, res)=>{
    return res.status(200).json([]);
});

app.post('/usuarios', (req, res)=>{
    return res.status(200).json([]);
});

app.get('/noticias', (req, res)=>{
    return res.status(200).json([]);
});

app.post('/noticias', (req, res)=>{
    return res.status(200).json([]);
})



app.listen(8080, ()=>{              
    console.log("Servidor rodando na porta 8080")             
});

