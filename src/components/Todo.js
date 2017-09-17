components.todo = class Todo {

  /**
   * 
   * @param {Number} id 
   * @param {String} name 
   * @param {Boolean} isDone default: false 
   */
  constructor(id, name, isDone = false){
      typeCheck(
          [id, "number"],
          [name, "string"],
          [isDone, "boolean"],
      )

      this.id = id;
      this.name = name;
      this.isDone = isDone;
  }

  /**
   * Get todo Node
   * @returns {Node}
   */
  getNode(){
    const id = this.id;
    const name = this.name;
    const isDone = this.isDone;

    const todoLi = document.createElement("li");
    todoLi.id = "todo" + id;

    const nameSpan = document.createElement("span");
    //nameSpan.addEventListener("click", this.name.bind(this), false);
    nameSpan.innerText = name;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Supprimer";
    deleteButton.addEventListener("click", () => todoActions.deleteTodo(id), false);

    const isDoneButton = document.createElement("button");
    isDoneButton.innerText = isDone ? "Done" : "Not Done";
    isDoneButton.addEventListener("click", () => todoActions.switchIsDone(id), false);
    isDoneButton.addEventListener("mouseenter", () => isDoneButton.innerText = isDone ? "Undone" : "Done", false);
    isDoneButton.addEventListener("mouseleave", () => isDoneButton.innerText = isDone ? "Done" : "Not Done", false)

    todoLi.appendChild(nameSpan);
    todoLi.appendChild(deleteButton);
    todoLi.appendChild(isDoneButton);
    
    return todoLi;
  }

  switchIsDone(){
    this.isDone = !this.isDone;
  }

  /**
   * Check equality
   * @param {*} object
   * @returns {boolean} 
   */
  equals(object){
    let equals = true;
    
    equals = equals && object instanceof Todo;
    equals = equals && object.id === this.id;

    return equals;
  }
}