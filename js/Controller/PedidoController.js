import {Servidor} from "../Model/entidades/Servidor.js";
import {estadoPedidoToText} from "./GeralHelper.js";

class PedidosController{
    constructor(){
        this.servidor = new Servidor();
        this.inicialized = 0;
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre){
    obterPedidosDaLoja(loja, parametros = null){

        return this.servidor.requisitar('GET','/lojas/'+loja.id+'/pedidos', parametros, function () {
            $('div#IndexProgressBar').addClass('active');
        }, function(pedidos, textStatus, xhr){

            /*if(!this.inicialized){
                this.inicialized = 1;
                new PedidosController().inicializarPedidos(loja, pedidos);
            }*/
            new PedidosController().inicializarPedidos(loja, pedidos);
        }, function () {
            M.toast({html: 'Erro ao obter os pedidos!', classes: 'rounded'});
        }, function () {
            $('div#IndexProgressBar').removeClass('active');
        });
    }
    actualizarPedido(loja, pedido){
        let ped = Object.assign({},pedido);
        delete pedido.id;
        return this.servidor.requisitar('PUT','/lojas/'+loja.id+'/pedidos/'+ped.id, JSON.stringify(pedido), function () {

        }, function () {

        }, function () {
            M.toast({html: 'Erro na operação! Verifique a sua conexão', classes: 'rounded'});
        }, function () {

        });
    }

    obterUmPedidoDaLoja(loja, pedido){
        return this.servidor.requisitar('GET','/lojas/'+loja.id+'/pedidos/'+pedido.id, null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }//JSON: idPedido, estadoPedido e data[hora]
    /* Estados: 1--> aceite
                6--> com o Delivery

     */
    mudarEstadoPedido(loja, estadoPedido){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/pedidos/'+estadoPedido.idPedido, estadoPedido, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }

    inicializarPedidos(loja, pedidos=[]){
        let jaExecutado = 0;
        let a = ' ';
        let activo = 'class="orange lighten-4"';

        var head = `<li>
            <br>
            <br>
        </li>
        <li>
            <h5>Pedidos</h5>
            <form class="col s12">
                <div class="input-field">
                    <i class="material-icons prefix">search</i>
                    <input id="icon_prefix2" type="text">
                    <label for="icon_prefix2">Pesquisar</label>
                </div>
            </form>`;
        let verMais = ` <li class="verMais">
                            <a class="waves-effect" href="#">
                                <div class="grey-text center" style="height: 30px;">Ver pedidos antigos</div>
                            </a>
                        </li>`;


        pedidos.forEach(function (pedido) {
            let estado = estadoPedidoToText(pedido.isAccept);
            //Todo pegar o cliente
            a += ` <li ${activo}>
                            <a class="waves-effect" style="height: 70px;" href="#">
                                <span class="new badge ${estado.corClasse}" data-badge-caption="${estado.estado}"></span>
                                <div class="title truncate" style="height: 30px;">#<span class="codigoProduto">${pedido.codPedido}</span> ${pedido.idCliente}</div>
                                <span class="blue-grey-text" style="font-size: smaller;">${pedido.dataDeEmissao} às ${pedido.receptLojaTime}</span>
                                <span class="i hide">${pedido.id}</span>
                            </a>
                        </li>`;
            if(!jaExecutado){
                pedidosContainerSetContent(pedido);
                jaExecutado =1;
                activo='';
            }
        });
        $("div#pedidosPag ul.sidenav2").html(function (index, oldHtml) {
            return head + a + verMais;
        });
        //Logica de seleccao de pedidos
        $('div#pedidosPag ul.sidenav2 li:gt(1):not(.verMais)').click(function () {
            //Actualiza a seleccao da lista
            $(this).parents('ul.sidenav2').find('li.orange.lighten-4').removeClass('orange lighten-4');
            $(this).addClass('orange lighten-4');

            //Actualiza o conteudo do Content
            new PedidosController().obterUmPedidoDaLoja(loja, {id: $(this).find('span.i').text()})
                .done(function (pedido) {
                    pedidosContainerSetContent(pedido);
                });
        });


            $('div#pedidosPag ul.sidenav2 li.verMais').click(function () {
                new PedidosController().obterPedidosDaLoja(loja);
                console.log('ver Mais');
            });

            function pedidosContainerSetContent(pedido) {
                let $decisaoNovoPedido = $('div#decisaoNovoPedido');
                let $container = $('div.container#pedidoContainer');
                switch (pedido.isAccept) {
                    case null:
                        $decisaoNovoPedido.removeClass('hide');
                        $container.addClass('grey lighten-3 wthite-text');
                        break;
                    default:
                        $decisaoNovoPedido.addClass('hide');
                        $container.removeClass('grey lighten-3 wthite-text');
                        break;
                }
                //Todo Onde tem nome para retornar o nome
                //$('div#pedidosPag div.container span#nomeCliente').html(pedido.cliente.nome);
                //$('div#pedidosPag div.container span#endereco').html(pedido.lugarCliente.endereco);
                //$('div#pedidosPag div.container span#referencia').html(pedido.descricaoLocal);
                //Todo Refazer isAccept !important
                let isAccept = estadoPedidoToText(pedido.isAccept);
                $('div#pedidosPag div.container span#isAccept').attr('class', 'new badge '+isAccept.corClasse).attr('data-badge-caption', isAccept.estado);


                $('div#pedidosPag div.container span#codPedido').html(pedido.codPedido);
                $('div#pedidosPag div.container span#dataDeEmissao').html(pedido.dataDeEmissao);
                $('div#pedidosPag div.container span#receptLojaTiime').html(pedido.receptLojaTiime);
                $('div#pedidosPag div.container span#tempoDeEntrega').html(pedido.tempoDeEntrega);
                $('div#pedidosPag div.container span#observacoes').html(pedido.observacoes);

                //Todo itens do pedido
                let items = ' ';
                JSON.parse(pedido.itensDoPedido).forEach(function (item) {
                    items += `<tr>
                    <td>${item.nome}</td>
                    <td>${item.qtd}</td>
                    <td>${item.preco}</td>
                </tr>`;
                });
                $('div#pedidosPag div.container tbody#itensDoPedido').html(items);


                $('div#pedidosPag div.container span#formaDePagamento').html(pedido.formaDePagamento);

                $('div#pedidosPag div.container span#isPay').html(pedido.isPay);
                $('div#pedidosPag div.container span#subTotal').html(pedido.subTotal);
                $('div#pedidosPag div.container span#taxaDeEntrega').html(pedido.taxaDeEntrega);
                $('div#pedidosPag div.container span#total').html(pedido.total);






            }
        }

}
export {PedidosController}