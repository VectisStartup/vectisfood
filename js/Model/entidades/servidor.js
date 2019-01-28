class Servidor{
    static host='http://localhost/www/vectis/api/v1/';
    _constructor(){
        this.xmlHttpRequest = new XMLHttpRequest();

    }
    static get this() {
        return servidor.host;
        //
    }
    requisitar(method, router,parametros){
        this.xmlHttpRequest.open(method, host+router,true);
        this.xmlHttpRequest.send(parametros);
        return this.xmlHttpRequest;
    }
}