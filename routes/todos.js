const express = require('express')
const router = express.Router();
const path = require('path')
const TodoHandler = require('../models/todo-handler')
const todohandler = new TodoHandler();




//Get
router.route('/todos').get((req, res) => {
    let todos;
    if (req.query.term) {
        todos = todohandler.searchTodos(req.query.term)
    } else {
        todos = todohandler.getAllTodos();
    }
    res.json(todos)
})

// Get by id
router.route('/todos/:id').get((req, res) => {
    if (!req.params.id) {
        return res.sendStatus(404)
    } else {
        let todo = todohandler.getTodoById(req.params.id);
        res.json(todo)
    }
})

//post
router.route('/todos').post((req, res) => {
    if (!req.body) {
        return res.sendStatus(404)
    } else {
        let todo = req.body;
        todohandler.addTodo(todo);
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }
})

//put
router.route('/todos/:id').put((req, res) => {
    if (!req.params.id || !req.body) {
        return res.sendStatus(400);
    }
    let todoId = req.params.id;
    let todo = req.body;
    todohandler.updateTodo(todoId, todo);
    res.send({ message: `todo ${todoId} has been updated` })
})

//delete
router.route('/todos/:id').delete((req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    todohandler.deleteTodo(+req.params.id);
    res.send({ message: `todo ${req.params.id} has been deleted!` })

})

module.exports = router;