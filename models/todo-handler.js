class todoHandler {
    constructor() {
        this.todos = [];
    }
    getAllTodos() {
        return this.todos;
    }
    getTodoById(todoId) {
        return this.todos.find((todo) => todo.id === todoId)
    }
    addTodo(todo) {
        this.todos.push(todo);
    }

    updateTodo(todoId, todo) {
        let idx = this.todos.findIndex((todo) => todo.id == todoId);
        this.todos[idx] = todo;

    }
    deleteTodo(todoId) {
        let idx = this.todos.findIndex((todo) => todo.id == todoId);
        this.todos.splice(idx, 1)
    }
    
    searchTodos(term) {
        return this.todos.filter(({ description }) =>
            description.toUpperCase().includes(term.toUpperCase()))
    }
}

module.exports = todoHandler