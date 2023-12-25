import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * schema sistema que determina as colunas de uma tabela 
 * (aqui por ex temos a coluna nome, email, senha ); ao determinar uma coluna temos que dizer 
 * qual modelo de dado que ela irá trabalhar ex: string, int, date, ...
 */

const noticiaSchema = new Schema(
    {
        titulo: String,
        img: String,
        texto: String,
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

const NoticiaModel = mongoose.model('noticias', noticiaSchema);

export default NoticiaModel;