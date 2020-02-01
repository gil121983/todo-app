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

function onStatus(todo, e) {
  stopDivClick(e);
  openDialog('STATUS', todo);
}

function onPriority(todo, e) {
  stopDivClick(e);
  openDialog('PRIORITY', todo);
}

function render() {
  var listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';
  for (let index = 0; index < toDoList.length; index++) {
    var todo = toDoList[index];
    
    var statusButton = document.createElement('button');
    statusButton.className = 'status-button';
    statusButton.innerHTML = todo.status;
    statusButton.onclick = onStatus.bind(event, todo)

    var todoElement = document.createElement('div');
    todoElement.className = 'todo';
    todoElement.innerHTML = `<strong>${todo.title}</strong> `;

    todoElement.onclick = onView.bind(event, todo);
    
    var priorityButton = document.createElement('button');
    priorityButton.className = 'priority-button';
    priorityButton.innerHTML = todo.priority;
    priorityButton.onclick = onPriority.bind(event, todo)

    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '✏️';
    editButton.onclick = onEdit.bind(event, todo)
      
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '❌';
    deleteButton.onclick = onDelete.bind(event, todo);


    todoElement.appendChild(statusButton);
    todoElement.appendChild(priorityButton);
    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);

    listElement.appendChild(todoElement);

  }
}