
class TodoStore extends Store {
  
  constructor(){
    super();

    this.list = [];

    requests.getTodos(todos => this.setTodos(todos));
  }

  
  /**
   * Set all todos with passed todos
   * @param {object} todos 
   */
  setTodos(todos){
    const list = this.list;

    for(const {id, name, isDone} of todos){
      list.push(new Todo(id, name, isDone));
    }

    this.dispatch(list);
  }


  /**
   * returns all todos
   * @returns {object} a list of todos
   */
  getTodos(){
    return this.list;
  }


  /**
   * add a todo to todoList
   * @param {string} todoName name of the new todo 
   */
  addTodo(todoName){
    typeCheck(
      [todoName, "string"],
    );

    const id = this.counter.getValue();
    const list = this.list;
    const todo = new Todo(id, todoName);

    list.push(todo);

    this.dispatch(list);
  }

  /**
   * 
   * @param {*} todoId 
   */
  switchDoneTodo(todoId){
    typeCheck(
      [todoId, "number"]
    );

    const list = this.list;
    const index = list.findIndex((todo) => {
      return todo.id === todoId;
    });

    list[index].switchIsDone();

    this.dispatch(list);
  }

  /**
   * change name of a todo
   * @param {number} todoId id of the todo to change
   * @param {string} todoName new name
   */
  changeTodoName(todoId, todoName){
    typeCheck(
      [todoId, "number"],
      [todoName, "string"],
    )

    const list = this.list;

    list.forEach((todo) => {
      if(todo.id === todoId){
        todo.name = todoName;
      }
    });

    this.dispatch(list);
  }

  /**
   * delete a todo from todoList
   * @param {number} todoId id of the todo to delete 
   */
  deleteTodo(todoId){
    typeCheck(
      [todoId, "number"],
    );

    const list = this.list;
    const index = list.findIndex( (todo) => {
      return todo.id === todoId;
    });

    list.splice(index, 1);

    this.dispatch(list);
  }

  /**
   * 
   * @param {object} action 
   */
  action(action){
    typeCheck(
      [action, "object"],
    );

    switch(action.type){
      case actionTypes.ADD_TODO:
        this.addTodo(action.todoName);
        break;

      case actionTypes.SWITCH_DONE_TODO:
        this.switchDoneTodo(action.todoId, action.isDone);
        break;

      case actionTypes.CHANGE_TODO_NAME:
        this.changeTodoName( action.todoId, action.todoName );
        break;

      case actionTypes.DELETE_TODO:
        this.deleteTodo( action.todoId );
        break;
    }
  }

}

TodoStore.instance = null;

  /**
   * returns the instance of todoStore
   * @returns {Store} instance of todoStore
   */
TodoStore.getInstance = function(){
  if(this.instance == null){
    this.store = new TodoStore();
  }

  return this.store;
}
