class Servidor{
    constructor(){
        this.host='http://localhost/www/vectis/api/v1';
    }
    requisitar(metodo, router, dados, loading, success, failure, sempre){
        $.ajax(
            {
                method: metodo,
                url:this.host+router,
                data: dados,
                beforeSend: loading(),
                statusCode: {
                    200:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    },
                    201:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    }

                }
            })
            .fail(function() {
                failure();
            })
            .always(function() {
                sempre();
            });
    }
}
export {Servidor};