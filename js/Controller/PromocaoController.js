import {Promocao} from "./../Model/entidades/Promocao.js";
import {Servidor} from "./../Model/entidades/Servidor.js";


class PromocaoController{
    constructor(){
        this.promocao = new Promocao();
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre)
    obterTodasAsDaPromocoesLoja(loja){
        this.servidor.requisitar('GET','/lojas/'+loja.Id+'/promocoes', null, function () {
            $('div#IndexProgressBar').addClass('active');
        }, async function(data, textStatus, xhr){
            let promocaoUI = PromocaoController.promocaoAdapter(JSON.parse(xhr.responseText));

            $('div#promocaoContainer').html(promocaoUI);
        }, function () {
            M.toast({html: 'Erro ao conectar com o servidor!', classes: 'rounded'});
        }, function () {
            $('div#IndexProgressBar').removeClass('active');
        });
    }
    obterPromocao(loja){
        this.servidor.requisitar('POST','/lojas/'+loja.Id+'/promocoes'+promocao.id,promocao, function () {

        }, function () {

        }, function () {

        });
    }
    criarPromocao(loja, promocao){
        this.servidor.requisitar('POST','/lojas/'+loja.Id+'/promocoes',promocao, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarPromocao(loja, promocao){
        this.servidor.requisitar('PUT','/lojas/'+loja.Id+'/promocoes'+promocao.id,promocao, function () {

        }, function () {

        }, function () {

        });
    }

    //Utils
    static promocaoAdapter(promocaoArray){
        let promocaoUI = " ";
        promocaoArray.forEach(function (promocao, indice, array) {
            promocaoUI += `<div class="col s12 m6 l3">
                                <div class="card sticky-action">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${new Servidor().host+'/src/'+promocao.imagem}">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title activator grey-text text-darken-4">${promocao.nome}<i class="material-icons right">keyboard_arrow_up</i></span>
                                        <span>${promocao.preco}</span>
                                    </div>
                                    <div class="card-action">
                                        <a href="#">ELIMINAR</a>
                                        <a href="#">EDITAR</a>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">${promocao.nome}<i class="material-icons right">keyboard_arrow_down</i></span>
                                        <p>${promocao.descricao}</p>
                                        <p>Data de Término: ${promocao.dataTermino}</p>
                                        <p>Tempo de preparo: ${promocao.tempoDePreparo}</p>
                                        <p>Preço: ${promocao.preco} kz</p>
                                    </div>
                                </div>
                            </div>`;
        });
            if(promocaoUI === " "){
                M.toast({html: 'Você ainda não criou nenhuma promoção.', classes: 'rounded'});
                promocaoUI = `<div class="center">Nenhuma promocao criada</div>`;
            }
        return promocaoUI;
    }
}
export {PromocaoController}