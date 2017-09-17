
class Dispatcher {
    //dispatcher = null;
    //stores = [];

    constructor(){
        this.dispatcher = this;
        this.stores = [];
    }


    /**
     * add a store to the list
     * @param {Store} store the store to add 
     */
    addStore(store){
        if( !store instanceof Store ){
            throw new Error();
        }

        this.stores.push(store);
    }

    /**
     * dispatch an action to every stores
     * @param {object} action the action to dispatch
     */
    dispatch(action){
        typeCheck([action, "object"])

        for(const store of this.stores){
            store.action(action);
        }
    }
}

Dispatcher.instance = null;

/**
 * get instance of dispactcher
 * @returns {Dispatcher} instance of dispatcher
 */
Dispatcher.getInstance = function(){
    if (this.dispatcher == null){
        this.dispatcher = new Dispatcher();
    }

    return this.dispatcher;
}