const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const TodoItem = require('./models/todo-db-esquema');
const exp = require('constants');

const dbURL = *************

    // 'mongodb://localhost:27017/todo-list'
    mongoose.connect(dbURL)
        .then(() => {
            console.log("Conectado ao banco de dados!")
        })
        .catch(err => {
            console.log("Erro! Não foi possível se conectar ao banco de dados.")
            console.log(err)
        })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/tarefas', async (req, res) => {
    const lista = await TodoItem.find({})
    res.render('tarefas', { lista })
});

app.get('/novatarefa', (req, res) => {
    res.render('todo/novatarefa')
});

app.post('/tarefas', async (req, res) => {
    const novaTarefa = new TodoItem(req.body);
    await novaTarefa.save();
    res.redirect('tarefas')
});

app.get('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const showTodo = await TodoItem.findById(id);
    res.render('todo/detalhes', { showTodo });
});

app.get('/tarefas/:id/editar', async (req, res) => {
    const { id } = req.params;
    const editTodo = await TodoItem.findById(id);
    res.render('todo/editar', { editTodo });
});

app.post('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const edicao = await TodoItem.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/tarefas/${edicao._id}`)
})

app.post('/tarefas/:id/deletar', async (req, res) => {
    const { id } = req.params;
    const deletTodo = await TodoItem.findByIdAndDelete(id);
    res.redirect('/tarefas')
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servindo a porta ${port}`)
});