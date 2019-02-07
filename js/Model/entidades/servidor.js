class Servidor{
    constructor(){
        this.xmlHttpRequest = new XMLHttpRequest();
        this.host='http://localhost/www/vectis/api/v1';
    }
    requisitar(method, router,parametros){
        this.xmlHttpRequest.open(method, this.host+''+router,true);
        
        this.xmlHttpRequest.send(parametros);
        
        return this.xmlHttpRequest;
    }
    requisitarGETwithParameters(method, router,parametros){
        //console.log('Host',this.host);
        
        this.xmlHttpRequest.open(method, this.host+''+router+parametros,true);
    
        this.xmlHttpRequest.send();
        
        return this.xmlHttpRequest;
    }
}
export { Servidor };