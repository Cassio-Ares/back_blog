import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * schema sistema que determina as colunas de uma tabela 
 * (aqui por ex temos a coluna nome, email, senha ); ao determinar uma coluna temos que dizer 
 * qual modelo de dado que ela irá trabalhar ex: string, int, date, ...
 */

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

    /**
     *  const UsuarioModel = mongoose.model('usuario', usuarioSchema);
     * 
     * UsuarioModel irá carregar o schema ('usuario'/ dentro dos parenteses é o nome que a tabela terá 
     * no banco de dados/, usuarioSchema é a estrutura )
     * 
     */

    const UsuarioModel = mongoose.model('usuario', usuarioSchema);

    export default UsuarioModel;