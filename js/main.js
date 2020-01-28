init();

function init() {
    render();
}

function onEdit(todo, e) {
    openDialog('EDIT', todo);
  }
  
  function onDelete(todo, e) {
    openDialog('DELETE', todo);
  }

function render() {
    var listElement = document.querySelector('.todo-list');
    listElement.innerHTML = '';
    for (let index = 0; index < toDoList.length; index++) {
        var todo = toDoList[index];

        var todoElement = document.createElement('div');
        todoElement.className = 'todo';
        todoElement.innerHTML = todo.description;
        
        var priorityElement = document.createElement('div');
        priorityElement.className = 'todo';
        priorityElement.innerHTML = todo.priority;

        var editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = 'EDIT';
        editButton.onclick = onEdit.bind(event, todo);

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = 'DELETE';
        deleteButton.onclick = onDelete.bind(event, todo);

        todoElement.appendChild(editButton);
        todoElement.appendChild(deleteButton);

        listElement.appendChild(todoElement);

    }
}