var requests = (function(){
  const serverAdress = "http://localhost:8888";
  
  class xhr {
    constructor(domain){
      this.domain = domain || "";
      this.parameters = [];
      this.request = new XMLHttpRequest();  

      return this;
    }

    path(path){
      this.path = path;
      
      return this;
    }

    method(method){
      this.method = method;
      
      return this;
    }

    parameter(name, value){
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
      


      return domain + path + "?" + query;
    }

    end(callback){
      const request = this.request;
      const url = this.getUrl();
      const method = this.method;
      
      request.open(method, url);
      request.send();
    }
  }


  return{
    getTodos(){
      const request = new xhr(serverAdress)
        .method("get")
        .path("/bonjour")
        .parameter("nom", "GRANDIERE")
        .parameter("prenom", "Vincent")
        .end();
    }
  }
})();