var requests = (function(){
  const serverDomain = "http://localhost:8888";
  
  /**
   * Parse parameters to return a query
   * @param {object} parameters An array of query strings 
   */
  function getQuery(parameters){
    typeCheck(
      [parameters, "object"]
    )

    return parameters.join('&');
  }


  /**
   * get url with domain, path and maybe query
   * @param {string} domain server url
   * @param {string} path 
   * @param {string} query 
   */
  function getUrl(domain, path, query){
    typeCheck(
      [domain, "string"],
      [path, "string"],
      [query, "string", true],
    )
    let url = domain + path;

    if(query.length > 0){
      url += "?" + query;
    }

    return url;
  }

  /**
   * Perso response to json
   * @param {object} res 
   * @param {function} callback 
   */
  function parseResponse(res, callback){
    typeCheck(
      [res, "object"],
      [callback, "function", true],
    );

    const response = res.currentTarget.response;
    const Json = JSON.parse(response);
    
    callback(Json);
  }

  class xhr {
    constructor(domain){
      this.domain = domain;
      this.path = "/";
      this.method = "get";
      this.parameters = [];
      this.request = new XMLHttpRequest();  

      return this;
    }

    /**
     * Set request method
     * @param {string} method "get" | "post" | "put" | "delete" 
     */
    setMethod(method){
      if(method !== "get" && method !== "post" && method !== "put" && method !== "delete"){
        throw new Error("invalid method");
      }
      
      this.method = method;
      return this;
    }
    
    /**
     * set path
     * @param {String} path 
     */
    setPath(path){
      typeCheck(
        [path, "string"]
      );

      this.path = path;
      
      return this;
    }

    /**
     * 
     * @param {string} name 
     * @param {string} value 
     */
    addParameter(name, value){
      typeCheck(
        [name, "string"],
        [value, "string"],
      )
      this.parameters.push(name + '=' + value);
      
      return this;
    }

    /**
     * send request
     * @param {function} callback 
     */
    end(callback){
      typeCheck(
        [callback, "function", true],
      );

      const {request, method, parameters, domain, path} = this;

      const query = getQuery(parameters);
      const url = getUrl(domain, path, query);

      request.addEventListener("load", (res) => parseResponse(res, callback));

      request.open(method, url);
      request.send();
    }
  }


  return{

    /**
     * Get all todos
     * @param {function} callback 
     */
    getTodos(callback){
      typeCheck(
        [callback, "function", true],
      );

      const request = new xhr(serverDomain)
        .setMethod("get")
        .setPath("/todos")
        .end(callback);
    }
  }
})();