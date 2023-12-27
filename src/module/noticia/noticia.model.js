import mongoose from "mongoose";

const { Schema } = mongoose;


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

    
const NoticiaModel = mongoose.model('noticias', noticiaSchema);

module.exports = NoticiaModel;   // forma certa de exportar um model