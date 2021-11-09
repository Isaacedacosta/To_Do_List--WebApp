const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    Prioridade: {
        type: String,
        enum: ["alta", "media", "baixa"],
        lowercase: true
    },
    Anotacao: {
        type: String
    }
})

const TodoItem = mongoose.model('TodoItem', todoSchema);

module.exports = TodoItem;