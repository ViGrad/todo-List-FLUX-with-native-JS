
/**
 * initialisation
 */
function load(){
  new TodoList("notDoneTodoList", {onlyNotDone: true});
  new TodoList("doneTodoList", {onlyDone: true});

  const todoForm = document.getElementById("todoForm");
  todoForm.addEventListener("submit", sendTodoForm, false);

  todoForm.elements.todoName.focus();
}


/**
 * Add a new todo
 * @param {event} event 
 */
function sendTodoForm(event){
  event.preventDefault();

  const todoName = this.elements.todoName.value.trim();

  if(todoName.length === 0){
    return;
  }
  
  todoActions.addTodo(todoName);

  this.elements.todoName.value = "";
}


/**
 * Check types of arguments. Throw error if types are wrong
 * @param {object} args 
 */
function typeCheck(...args){
  let valid = true;

  for (const arg of args){
    const [val, type, nullable = false] = arg;

    switch(type){
      case "number":
        if(!tools.isNumber(val)){
          valid = false;
        }
        break;

      default:
        if(typeof(val) !== type){
          valid = false;
        }
        break;
    }

    //TODO: null case 
  }

  if (!valid){
      throw new Error("Type incorrect");
  }
}

