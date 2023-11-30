const mongoose = require('mongoose')
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


const NoticiaModel = mongoose.model("Noticia", noticiaSchema);

module.exports = NoticiaModel;