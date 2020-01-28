var dict = {
    ADD: {
      title: 'Add ToDo',
      content: getAddToDoForm
    },
    DELETE: {
      title: 'Delete ToDo',
      content: getDeleteToDoForm
    },
    EDIT: {
      title: 'Edit Todo',
      content: getEditToDoForm
    },
  }

  function testSweetAlert(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  function openDialog(type, todo) {
    var dialogElement = document.querySelector('.dialog');
    dialogElement.setAttribute('style', 'display: block');
  
    var data = dict[type];
  
    var titleElement = dialogElement.querySelector('.title');
    titleElement.innerHTML = data.title;
  
    var contentElement = dialogElement.querySelector('.content');
    contentElement.innerHTML = '';
    var content = data.content(todo);
    contentElement.appendChild(content);
  }
  
  function getAddToDoForm() {
    var formElement = document.createElement('form');
  
    var descInputElement = document.createElement('input');
    descInputElement.placeholder = 'Description:';
    formElement.appendChild(descInputElement);
  
    var submitButton = document.createElement('button');
    submitButton.innerHTML = 'submit'
    formElement.appendChild(submitButton);
  
    formElement.onsubmit = function (e) {
      e.preventDefault();
      toDoList.push({description: descInputElement.value });
      closeDialog();
      render();
    }
  
    return formElement
  }
  
  function getEditToDoForm(todo) {
    var container = document.createElement('form');
  
    var descInputElement = document.createElement('input');
    descInputElement.value = todo.description;
    container.append(descInputElement);
  
  
    var saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save'
    container.appendChild(saveButton);
  
    container.onsubmit = function (e) {
      e.preventDefault();
      let position = toDoList.indexOf(todo)
      toDoList.splice(position, 1, {
        description: descInputElement.value,
      })
      console.log("Changes has been saved");
      closeDialog();
      render();
    }
    return container;
  }
  
  
  function getDeleteToDoForm(todo) {

  
    element.onsubmit = function (e) {
      e.preventDefault();
      let position = toDoList.indexOf(todo)
      toDoList.splice(position, 1)
      closeDialog();
      render();
  
    }
    return element;
  }
  
  function closeDialog() {
    var dialogElement = document.querySelector('.dialog');
    dialogElement.setAttribute('style', 'display: none');
  }


  