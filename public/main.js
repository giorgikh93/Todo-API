let todoList = [];
const TODOS_API = '/api/todos';
let isEditAction = false;

loadTodos = () => {
    $.getJSON(TODOS_API, (todos) => {
        todoList = todos;
        updateTable(todos)
    });
}
loadTodos();

$('#submit').click(() => {
    let todo = {
        id: $('#idnumber').val(),
        status: $('#status').is(':checked'),
        description: $('#description').val(),
        start: $('#start').val(),
        end: $('#end').val()
    }
    isEditAction ? updateTodo(todo) : addTodo(todo);
})
addTodo = (todo) => {
    $.ajax(TODOS_API, {
        data: JSON.stringify(todo),
        contentType: 'application/json',
        type: "POST"
    }).done(() => {
        loadTodos();
        resetValues()

    })
}
//
edit = (id) => {
    isEditAction = true;
    let todo = id;
    $.ajax({
        method: 'get',
        url: `${TODOS_API}/${todo}`
    }).done((result) => {
        submit.value = 'Save Changes';
        $('#status').prop('checked', todo.status);
        idnumber.value = result.id;
        description.value = result.description;
        start.value = result.start;
        end.value = result.end;
    })
}
//
updateTodo = (todo) => {
    $.ajax(`${TODOS_API}/${todo.id}`, {
        data: JSON.stringify(todo),
        contentType: 'application/json',
        type: 'PUT',
    }).done(() => {
        isEditAction = false;
        loadTodos();
        resetValues()
    });
}
//
updateStatus = (event) => {
    const {
        target: { dataset, checked },
    } = event;

    const todoId = dataset.id;
    const todoStatus = checked;

    let todo = todoList.find((todo) => todo.id === todoId);

    todo = {
        ...todo,
        status: todoStatus,
    };

    $.ajax(`${TODOS_API}/${todoId}`, {
        data: JSON.stringify(todo),
        contentType: 'application/json',
        type: 'PUT',
    }).done(() => {
        loadTodos();
    });
}

//
deletetoDo = (id) => {
    let deleteId = id;
    $.ajax({
        method: "DELETE",
        url: `${TODOS_API}/${deleteId}`,
    }).done(loadTodos())
}
//

updateTable = (todos) => {
    $('#tbody').empty();
    for (let todo of todos) {
        $('#tbody').append(
            `
                <tr>
                    <td>
                    ${todo.status ? `<input type="checkbox" data-id=${todo.id} checked onchange=updateStatus(event)>` : `<input type="checkbox" data-id=${todo.id} onchange=updateStatus(event)/>`}
               
                    </td>
                    <td>${todo.id}</td>
                    <td>${todo.description}</td>
                    <td>${todo.start}</td>
                    <td>${todo.end}</td>
                    <td><button class="delete button" onclick ='deletetoDo(${todo.id})'>Delete</button><button class="edit button" onclick="edit(${todo.id})">Edit</button></td>
                    </tr>`
        )
    }
}

//
resetValues = () => {
    $('#status').prop('checked', false);
    $('#submit').val('Add Todo');
    $('#idnumber').val('');
    $('#description').val('');
    $('#start').val('');
    $('#end').val('');
}
//
search.onkeyup = () => {
    const term = $('#search').val();
    $.ajax(TODOS_API, {
        type: 'GET',
        data: { term: term },
    }).done((todos) => {
        updateTable(todos)
    })
}