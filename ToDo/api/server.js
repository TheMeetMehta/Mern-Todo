const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const bodyParser = require("body-parser"); 
mongoose.set('strictQuery', false);

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


mongoose.connect(
    process.env.DATABASE_URL
).then(() => console.log("connected to DB"))
 .catch(console.error)

const Todo = require('./model/Todo')

app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos) 
})

app.post('/todo/new', async(req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    await todo.save()

    res.json(todo) 
})

app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json("successfully deleted")
})

app.get('/todo/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.complete =! todo.complete

    todo.save();

    res.json(todo)
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))