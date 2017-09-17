class TodoList {

  /**
   * 
   * @param {String} elementId the html id od todoList 
   */
  constructor(elementId, {onlyDone = false, onlyNotDone = false}){
    typeCheck(
      [elementId, "string"]
    );

    this.$element = document.getElementById(elementId);
    
    const todoStore = TodoStore.getInstance();
    todoStore.addWatcher(todoList => this.refresh(todoList));
    this.todoStore = todoStore;

    this.onlyDone = onlyDone;
    this.onlyNotDone = onlyNotDone;

    this.todos = todoStore.getTodos();
    this.refresh(this.todos);
  }

  /**
   * Refresh html of todoList
   * @param {object} todoList todo list   
   */
  refresh(todoList){
    typeCheck(
      [todoList, "object"],
    );

    const $element = this.$element;

    /*
    const toDelete = previousList.filter((previousTodo) => {
      return !todoList.some((todo) => {
        return todo.id === previousTodo.id
      });
    });

    const toAdd = todoList.filter((todo) => {
      return !previousList.some((previousTodo) => {
        return todo.equals(previousTodo);
      });
    });


    for(const {id} of toDelete){
      $element.querySelector("#todo" + id).remove();      
    }

    for(const todo of toAdd){
      const node = todo.getNode();
      $element.appendChild(node);      
    }

    for(const {id, name} of todoList){
      nodes.push(this.getTodoNode(id, name));
    }
    */

    const filteredList = todoList.filter((todo) => {
      let valid = true;
      const todoIsDone = todo.isDone;

      if(this.onlyDone){
        valid = todoIsDone ? true : false;
      }

      if(this.onlyNotDone){
        valid = todoIsDone ? false : true;
      }

      return valid;
    });

    while(this.$element.firstChild){
      this.$element.firstChild.remove();
    }

    const nodes = filteredList.map((todo) => {
      return todo.getNode();
    })

    for(const node of nodes){
      this.$element.appendChild(node);
    }

    this.todos = filteredList;
  }

  onClickTodoName(event){
    typeCheck(
      [event, "object"]
    );

    event.preventDefault();
    const target = event.currentTarget;

    const nameForm = document.createElement("form");
    nameForm.addEventListener("submit", this.onSubmitChangeTodoName, false);

    const nameInput = document.createElement("input");
    nameInput.name = "newName";
    nameInput.value = target.textContent; 
    nameInput.addEventListener("blur", this.onBlurTodoName.bind(this), false);

    nameForm.appendChild(nameInput);

    event.currentTarget.replaceWith(nameForm);

    nameInput.focus();    
  }

  onBlurTodoName(event){
    typeCheck(
      [event, "object"]
    );

    event.preventDefault();
    const target = event.currentTarget;

    const nameSpan = document.createElement("span");
    nameSpan.innerText = target.value;
    nameSpan.addEventListener("click", this.onClickTodoName.bind(this));

    target.replaceWith(nameSpan);
  }

  onSubmitChangeTodoName(event){
    typeCheck(
      [event, "object"]
    );

    event.preventDefault();
    const target = event.currentTarget;

    const newName = target.elements.newName;
  }

}