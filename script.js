document.getElementById('add-button').addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoItem = createTodoElement(todoText);
        document.getElementById('todo-list').appendChild(todoItem);
        saveTodoToLocal(todoText);

        todoInput.value = '';
        todoInput.focus();
    }
}

function createTodoElement(todoText) {
    const li = document.createElement('li');
    const todoTextNode = document.createElement('span');
    todoTextNode.textContent = todoText;
    li.appendChild(todoTextNode);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const editButton = document.createElement('span');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function () {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = todoTextNode.textContent;
        inputField.classList.add('input-field');

        li.insertBefore(inputField, todoTextNode);
        li.removeChild(todoTextNode);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
    });

    const saveButton = document.createElement('span');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');
    saveButton.style.display = 'none';
    saveButton.addEventListener('click', function () {
        const inputField = li.querySelector('.input-field');
        todoTextNode.textContent = inputField.value.trim();

        li.insertBefore(todoTextNode, inputField);
        li.removeChild(inputField);
        editButton.style.display = 'inline';
        saveButton.style.display = 'none';

        updateTodoInLocal(todoText, todoTextNode.textContent);
    });

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function () {
        li.remove();
        removeTodoFromLocal(todoText);
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(saveButton);
    buttonsDiv.appendChild(deleteButton);
    li.appendChild(buttonsDiv);

    return li;
}

function saveTodoToLocal(todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todoText => {
        const todoItem = createTodoElement(todoText);
        document.getElementById('todo-list').appendChild(todoItem);
    });
}

function removeTodoFromLocal(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoInLocal(oldText, newText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todos.indexOf(oldText);
    if (todoIndex > -1) {
        todos[todoIndex] = newText;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}