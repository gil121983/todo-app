init();

function init() {
  render();
}

function onView(todo, e) {
  openDialog('VIEW', todo);
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
    todoElement.innerHTML = " status: " + todo.status + "  priority: " + todo.priority + " - " + todo.title ;

    var viewButton = document.createElement('button');
    viewButton.className = 'view-button';
    viewButton.innerHTML = 'VIEW';
    viewButton.onclick = onView.bind(event, todo);

    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = 'EDIT';
    editButton.onclick = onEdit.bind(event, todo);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = 'DELETE';
    deleteButton.onclick = onDelete.bind(event, todo);

    todoElement.appendChild(viewButton);
    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);

    listElement.appendChild(todoElement);

  }
}