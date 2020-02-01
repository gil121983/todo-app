
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
  VIEW: {
    title: 'View ToDo',
    content: viewTodo
  },
  STATUS: {
    title:"Edit Status",
    content: editStatus
  },
  PRIORITY: {
      title:"Edit Priority",
      content: editPriority
  }
}

function openDialog(type, todo) {
  var dialogElement = document.querySelector('.dialog');
  var data = dict[type];
  var content = data.content(todo);
}

function viewTodo(todo) {
  Swal.fire({
    title: todo.title + "\n  status: " + todo.status + "  priority: " + todo.priority,
    text: todo.description,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Edit'
  }).then((result) => {
    if (result.value) {
      getEditToDoForm(todo);
    }
  })
}

function getAddToDoForm() {

  (async () => {
    var newTodoObj = {};
    const { value: priority } = await Swal.fire({
      title: 'Set Priority',
      input: 'select',
      inputOptions: {
        "🔴": '🔴 High ',
        "🟡": '🟡 Modrate ',
        "🟢": '🟢 Low '
      },
      inputPlaceholder: 'Select a priority',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '🔴' || value === '🟢' || value === '🟡') {
            resolve()
            newTodoObj.priority = value;
          } else {
            resolve("you must pick priority!");
          }
        })
      }
    })
    if (priority) {
      Swal.fire(`You selected: ${priority}`)

      const { value: title } = await Swal.fire({
        title: 'Enter a title',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (title) {
        Swal.fire(`title is ${title}`)
        newTodoObj.title = title;

        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder: 'Describe your task...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        })

        if (text) {
          Swal.fire(text)
          newTodoObj.description = text;
          newTodoObj.status = "🚧"
          toDoList.push(newTodoObj);
          init();

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'saved successfully'
          })
        }

      }
    }
  })()
}

function getEditToDoForm(todo) {
  (async () => {
    var currentTodoObj = todo;
    

      const { value: title } = await Swal.fire({
        title: 'Enter a title',
        input: 'text',
        inputValue: todo.title,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (title) {
        Swal.fire(`title is ${title}`)
        currentTodoObj.title = title;

        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputValue: todo.description,
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        })

        if (text) {
          Swal.fire(text)
          currentTodoObj.description = text;
          init();

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'saved changes'
          })
        }
      }
  })()
}



function getDeleteToDoForm(todo) {
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
      let position = toDoList.indexOf(todo)
      toDoList.splice(position, 1)
      render();

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Task Deleted'
      })
    }
  })


}

function stopDivClick(e) {
  var event = e || arguments[0] || window.event;
  event.stopPropagation();
}

function editStatus(todo) {
  console.log();
  
  var currentTodoObj = todo;
  (async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "🚧": "🚧  In Progress",
          "🔎": "🔎  In Review",
          "👍": "👍  Done"
        })
      }, 1000)
    })

    const { value: status } = await Swal.fire({
      title: 'Select Status',
      input: 'radio',
      inputValue: todo.status,
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })

    if (status) {
      Swal.fire({ html: `You selected: ${status}` })
      currentTodoObj.status = status;
    }

    init();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'saved changes'
    });
  })()
}

function editPriority(todo) {

  
  (async () => {
    var currentTodoObj = todo;
    const { value: priority } = await Swal.fire({
      title: 'Set Priority',
      input: 'select',
      inputValue: todo.priority,
      inputOptions: {
        "🔴": '🔴 High ',
        "🟡": '🟡 Modrate ',
        "🟢": '🟢 Low '
      },
      inputPlaceholder: 'Select a priority',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '🔴' || value === '🟢' || value === '🟡') {
            resolve()
            currentTodoObj.priority = value;
          } else {
            resolve("you must pick priority!");
          }
        })
      }
    })
    if (priority) {
      Swal.fire(`You selected: ${priority}`)
    }
  })()
}


