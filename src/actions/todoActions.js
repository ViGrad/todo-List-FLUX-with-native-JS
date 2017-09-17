var todoActions = {

  /**
   * Add todo action
   * @param {String} todoName name of new todo 
   */
  addTodo(todoName){
    const action = {
      type: actionTypes.ADD_TODO,
      todoName: todoName,
    };
    
    Dispatcher.getInstance().dispatch(action);
  },

  /**
   * 
   * @param {Number} todoId 
   * @param {*} isDone 
   */
  switchIsDone(todoId){
    const action = {
      type: actionTypes.SWITCH_DONE_TODO,
      todoId: todoId,
    };

    Dispatcher.getInstance().dispatch(action);
  },

  /**
   * change todo name action
   * @param {number} todoId 
   */
  changeTodoName(todoId){
    const action ={
      type: actionTypes.CHANGE_TODO_NAME,
      todoId: todoId,
    }

    Dispatcher.getInstance().dispatch(action);
  },

  /**
   * delete todo action
   * @param {number} todoId 
   */
  deleteTodo(todoId){
    const action = {
      type: actionTypes.DELETE_TODO,
      todoId: todoId,
    }

    Dispatcher.getInstance().dispatch(action);
  }
}