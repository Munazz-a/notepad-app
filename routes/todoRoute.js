const express = require('express');
const route = express.Router();
const Todo = require('../models/todomodel');

// Storing todo tasks in MongoDB
route.post('/', async(req, res) => {
    try{
        console.log('BODY: ', req.body);
        const newTodo = new Todo({
        task : req.body.task,
        completed : req.body.completed
    });
    await newTodo.save();
    res.status(201).json(newTodo);
    } catch(err) {
        console.log(err)
        res.status(500).json({ message : 'Failed to create todo'})
    }
});


// Fetching todo tasks from MongoDB
route.get('/all', async(req, res) => {
    try{
        const todos = await Todo.find().sort({ createdAt : -1});
        res.json(todos);
    } catch(err) {
        res.status(500).json({ message : 'Failed to fetch todos' });
    }
})

route.delete('/:id', async (req, res) =>{
    try {
        const todoDelete = await Todo.findByIdAndDelete(req.params.id);
        if(!todoDelete){
           return res.status(404).json({ message : 'Todo not found'})
        }
        res.json({ message : 'deleted successfully '});
    } catch (error) {
        req.status(500).json({ message : 'failed to delete todo '});
    }
})

route.patch('/:id', async(req, res) => {
    try{
        const UpdateTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed : req.body.completed},
            { new : true }
        );
        res.json(UpdateTodo);
    } catch(err) {
        res.status(500).json({ message : 'Failed to update Todo'})
    }
});

route.get('/', (req, res) => {
  res.render('todo'); // This renders todo.ejs
});

module.exports = route;