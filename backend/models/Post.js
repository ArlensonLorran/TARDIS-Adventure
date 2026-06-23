const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema
(
    {
        title: { type: String, required: [true, "O Título é obrigatório"], trim: true, minlength: [5, "O Título deve ter pelo menos 5 caracteres"], maxlength: [100, "O Título não pode exceder 100 caracteres"] },
        description: { type: String, required: [true, "A Descrição é obrigatória"], trim: true, minlength: [10, "A Descrição deve ter pelo menos 10 caracteres"], maxlength: [100, "A Descrição não pode exceder 100 caracteres"] },
        content: { type: String, required: [true, "O Conteúdo é obrigatório"], trim: true, minlength: [20, "O Conteúdo deve ter pelo menos 20 caracteres"] },
        imageUrl: { type: String, trim: true, default: "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg" },
        comments: [{author: { type: String, required: true }, text: { type: String, required: true }, createdAt: { type: Date, default: Date.now }}],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);