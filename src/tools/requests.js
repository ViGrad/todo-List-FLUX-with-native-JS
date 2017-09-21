var requests = (function(){
  const serverDomain = "http://localhost:8888";
  
  class xhr {
    constructor(domain){
      this.domain = domain || "";
      this.parameters = [];
      this.request = new XMLHttpRequest();  

      return this;
    }

    /**
     * set path
     * @param {String} path 
     */
    path(path){
      typeCheck(
        [path, "string"]
      );

      this.path = path;
      
      return this;
    }

    method(method){
      if(method !== "get" && method !== "post" && method !== "put" && method !== "delete"){
        throw new Error("invalid method");
      }
      
      this.method = method;
      
      return this;
    }

    parameter(name, value){
      typeCheck(
        [name, "string"],
        [value, "string"],
      )
      this.parameters.push(name + '=' + value);
      
      return this;
    }

    getQuery(){
      const query = this.parameters.join('&');
      return query;
    }

    getUrl(){
      const domain = this.domain;
      const path = this.path;
      const query = this.getQuery();

      let url = domain + path;

      if(query.length > 0){
        url += "?" + query;
      }

      return url;
    }

    end(callback){
      const request = this.request;
      const url = this.getUrl();
      const method = this.method;

      request.open(method, url);
      request.addEventListener("load", (res) => (callback(JSON.parse(res.currentTarget.response))));
      request.send(callback);
    }
  }


  function resS (res){
    console.log(res);
  }

  return{
    getTodos(callback){
      const request = new xhr(serverDomain)
        .method("get")
        .path("/todos")
        //.end((res) => resS(res))
        .end(callback);
    }
  }
})();