init();

function init() {
  render();
}

function onView(todo, e) {
  openDialog('VIEW', todo);
}

function onEdit(todo, e) {
  stopDivClick(e);
  openDialog('EDIT', todo);
}

function onDelete(todo, e) {
  stopDivClick(e);
  openDialog('DELETE', todo);
}

function render() {
  var listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';
  for (let index = 0; index < toDoList.length; index++) {
    var todo = toDoList[index];

    var todoElement = document.createElement('div');
    todoElement.className = 'todo';
    todoElement.innerHTML = `${todo.status} <strong>${todo.title}</strong>  <small>priority: </small>${todo.priority}`;

    todoElement.onclick = onView.bind(event, todo);

    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '✏️';
    editButton.onclick = onEdit.bind(event, todo)
      
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '❌';
    deleteButton.onclick = onDelete.bind(event, todo);


    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);

    listElement.appendChild(todoElement);

  }
}