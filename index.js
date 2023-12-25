const express = require('express');  //importamos o express
const app = express();               // acionamos ela atraves de app

app.use(express.json());

app.listen(8080, ()=>{               // usamos o listen para criar a porta que irá rodar 
    console.log("Servidor rodando na porta 8080")             
});

/**
 * apos isso no package.json instalamos o nodemon e o invocamos como dev para inicializar
 * como:
 *                "scripts": {
                       "test": "echo \"Error: no test specified\" && exit 1",
                       "dev": "nodemon index.js"
                             },

   dai no terminal podemos digitar yarn dev para inicializar o a API
 */