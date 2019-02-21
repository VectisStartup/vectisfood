import {Servidor} from "../Model/entidades/Servidor.js";

class PedidosController{
    constructor(){
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre){
    obterPedidosDaLoja(loja){
        this.servidor.requisitar('GET','/lojas/'+loja.Id+'/pedidos', null, function () {
            $('div#IndexProgressBar').addClass('active');
        }, async function(data, textStatus, xhr){


            //$('div#produtosContainer').html(produtosUI);


            //sessionStorage.setItem('prod', xhr.responseText);
        }, function () {
            M.toast({html: 'Erro ao obter os pedidos!', classes: 'rounded'});
        }, function () {
            $('div#IndexProgressBar').removeClass('active');
        });
    }
    obterUmPedidosDaLoja(loja, produto){
        this.servidor.requisitar('GET','/lojas/'+loja.id+'/pedidos/'+produto.id, null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    criarPedidos(loja, dados){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/pedidos', dados, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarProduto(loja, pedido){
        this.servidor.requisitar('PUT','/lojas/'+loja.id+'/pedidos', dados, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }


    // Utilities
    static pedidoAdapter(produtosArray){
        let pedidoUI = " ";
        produtosArray.forEach(function (produto, indice, array) {
            pedidoUI +=`<div class="col s12 m6 l3">
                            <div class="card sticky-action">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${new Servidor().host+'/src/'+produto.imagem}">
                                </div>
                                <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${produto.nome}<i class="material-icons right">keyboard_arrow_up</i></span>
                            <p>${produto.preco} kz</p>
                            </div>
                            <div class="card-action" id="${produto.id}">
                                <a class="eliminar" href="#">ELIMINAR</a>
                                <a href="#">EDITAR</a>
                                </div>
                                <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${produto.nome}<i class="material-icons right">keyboard_arrow_down</i></span>
                            <p>${produto.descricao}</p>
                            <p>Tempo de preparo: ${produto.tempoDePreparo}</p>
                            <p>Preço: ${produto.preco}</p>
                        </div>
                    </div>
            </div>`;
        });
        return pedidoUI;
    }

    static novoPedidoAdapter(pedidoArray){
        let novoPedidoUI = " ";
        pedidoArray.forEach(function (pedido, indice, array) {
            novoPedidoUI +=`<div class="col s12 m6 l3">
                            <div class="card sticky-action">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${new Servidor().host+'/src/'+produto.imagem}">
                                </div>
                                <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${produto.nome}<i class="material-icons right">keyboard_arrow_up</i></span>
                            <p>${produto.preco} kz</p>
                            </div>
                            <div class="card-action" id="${produto.id}">
                                <a class="eliminar" href="#">ELIMINAR</a>
                                <a href="#">EDITAR</a>
                                </div>
                                <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${produto.nome}<i class="material-icons right">keyboard_arrow_down</i></span>
                            <p>${produto.descricao}</p>
                            <p>Tempo de preparo: ${produto.tempoDePreparo}</p>
                            <p>Preço: ${produto.preco}</p>
                        </div>
                    </div>
            </div>`;
        });
        return novoPedidoUI;
    }


}
export {PedidosController}