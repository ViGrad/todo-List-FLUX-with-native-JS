class Store {
  constructor(){
    this.watchers = [];
    Dispatcher.getInstance().addStore(this);
  }
  

  /**
   * add a watcher to the store
   * @param {function} callBack callback to add 
   */
  addWatcher(callBack){
    typeCheck(
      [callBack, "function"],
    );

    this.watchers.push(callBack);
  }


  /**
   * delete a watcher from the list 
   * @param {function} callBack callback to delete 
   */
  deleteWatcher(callBack){
    typeCheck(
      [callBack, "functon"],
    );

    const watchers = this.watchers;
    const index = watchers.findIndex((watcher) => {
      return watcher === callBack
    });

    watchers.splice(index);
  }


  /**
   * dispatch something to every watchers
   * @param {*} object object to dispatch
   */
  dispatch(object){
    for(const watcher of this.watchers){
      watcher(object);
    }
  }
  
}
