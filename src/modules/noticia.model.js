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

export default NoticiaModel;