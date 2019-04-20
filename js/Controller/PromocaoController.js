import {Servidor} from "./../Model/entidades/Servidor.js";
import {jsonReplacer, validarTipoDeImagem} from "./GeralHelper.js";

class PromocaoController{
    constructor(){
        this.servidor = new Servidor();
        this.inicialized = false;
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre)
    obterTodasAsDaPromocoesLoja(loja){
        this.servidor.requisitar('GET','/lojas/'+loja.id+'/promocoes', null, function () {
            $('div#IndexProgressBar').addClass('active');
        },function(data, textStatus, xhr){
            let promocaoUI;

            if(xhr.status === 204){
                promocaoUI = '<div class="col s12 center-align"><span class="grey-text">Ainda não iniciou nenhuma promoção. Experimente criar uma</span> </div>';
                M.toast({html: 'Ainda não iniciou nenhuma promoção', classes: 'rounded'});
            }else {
                promocaoUI = PromocaoController.promocaoAdapter(JSON.parse(xhr.responseText));
            }
            $('div#promocaoContainer').html(promocaoUI);


            new PromocaoController().init(loja);
        }, function () {
            M.toast({html: 'Erro ao conectar com o servidor!', classes: 'rounded'});
        }, function () {
            $('div#IndexProgressBar').removeClass('active');
        });
    }
    obterPromocao(loja){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/promocoes'+promocao.id,null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    criarPromocao(loja, promocao){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/promocoes',promocao, function () {

        }, function () {
            new PromocaoController().obterTodasAsDaPromocoesLoja(loja);
            $('div#modalAddPromocao.modal').modal('close');
            M.toast({html: 'Promoção criada', classes: 'rounded'});
        }, function () {
            M.toast({html: 'Não foi possível criar a promoção. Tente mais tarde', classes: 'rounded'});
        }, function () {
        }, /*Com imagem*/true);
    }
    actualizarPromocao(loja, promocao){
        this.servidor.requisitar('PUT','/lojas/'+loja.id+'/promocoes/'+promocao.id,JSON.stringify(promocao, jsonReplacer), function () {

        }, function () {
            M.toast({html: 'edição guardada', classes: 'rounded'});
            $('div#modalEditarPromocao.modal').modal('close');
            new PromocaoController().obterTodasAsDaPromocoesLoja(loja);
        }, function () {
            M.toast({html: 'edição não guardada', classes: 'rounded'});
        }, function () {

        });
    }
    actualizarPromocaoImagem(loja, promocao, imagem){
        return this.servidor.requisitar('POST','/lojas/'+loja.id+'/promocoes/'+promocao.id+'/imagens',imagem, function () {

        }, function () {
            M.toast({html: 'edição guardada', classes: 'rounded'});
            $('div#modalEditarPromocao.modal').modal('close');
            new PromocaoController().obterTodasAsDaPromocoesLoja(loja);
        }, function () {
            M.toast({html: 'edição não guardada', classes: 'rounded'});
        }, function () {

        }, /*Com imagem*/ true);
    }
    apagarPromocao(loja, promocao){
        this.servidor.requisitar('DELETE','/lojas/'+loja.id+'/promocoes/'+promocao.id,null, function () {

        }, function () {
            M.toast({html: 'Promoção eliminada', classes: 'rounded'});
            $('div#modalEliminarPromocao.modal').modal('close');
            new PromocaoController().obterTodasAsDaPromocoesLoja(loja);
        }, function () {
            M.toast({html: 'Não foi possível eliminar a promoção. Tente novamente mais tarde', classes: 'rounded'});

        }, function () {

        });
    }
    init(loja){
        if (!this.inicialized){
            this.inicialized = true;
            new PromocaoController().editarPromocao(loja);
            new PromocaoController().eliminarPromocao(loja);
        }


    }
    //Utils
    static promocaoAdapter(promocaoArray){

        let promocaoUI = " ";
        promocaoArray.forEach(function (promocao) {
            promocaoUI += `<div class="col s12 m6 l3">
                                <div class="card sticky-action">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${promocao.imagem}">
                                        <span class="identifier hide">${promocao.id}</span>
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title activator grey-text text-darken-4"><span class="nome">${promocao.nome}</span><i class="material-icons right">keyboard_arrow_up</i></span>
                                        <span>${promocao.preco} kz</span>
                                    </div>
                                    <div class="card-action">
                                        <a href="#" class="btnEliminarPromocao">Terminar</a>
                                        <a href="#" class="btnEditarPromocao">Editar</a>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">${promocao.nome}<i class="material-icons right">keyboard_arrow_down</i></span>
                                        <p>Descrição:<span class="descricao">${promocao.descricao}</span></p>
                                        <p>Data de Término: <span class="dataTermino">${promocao.dataTermino}</span></p>
                                        <p>Tempo de preparo: <span class="tempoDePreparo">${promocao.tempoDePreparo}</span></p>
                                        <p>Preço: <span class="preco">${promocao.preco}</span> kz</p>
                                    </div>
                                </div>
                            </div>`;
        });
            if(promocaoUI === " "){
                M.toast({html: 'Você ainda não criou nenhuma promoção.', classes: 'rounded'});
                promocaoUI = `<div class="center grey-text">Nenhuma promocao criada</div>`;
            }
        return promocaoUI;
    }


    editarPromocao(loja){
        // -------------------- Editar Produto --------------------------------------------- ///
        //Todo Refatorar e tratar a imagem
        $('div#promocaoPag a.btnEditarPromocao').click(function (e) {
            e.preventDefault();
            let $card = $(this).parents('div.sticky-action');

            $('div#modalEditarPromocao.modal').modal('open');
            $('input[name=nomeP]').val($card.find('span.nome').html());
            $('input[name=txtPromocaoIdentifier]').val($card.find('span.identifier').text());
            $('select[name=categoriaP]').find(`option[value|='${$card.find('span.categoria').html()}']`).prop('selected', 'true');
            $('textarea[name=descricaoP]').val($card.find('span.descricao').html());
            $('img[name=imagemP]').attr('src', $card.find('img.activator').attr('src'));
            $('input[name=tempoDePreparoP]').val($card.find('span.tempoDePreparo').html());
            $('input[name=dataTerminoP]').val($card.find('span.dataTermino').html());
            $('input[name=precoP]').val(parseInt($card.find('span.preco').html()));

            $('select').formSelect();

        });

        $('form[name=frmEditarPromocao]').submit(function (e) {
            e.preventDefault();
            new PromocaoController().actualizarPromocao(loja,
                {
                    id: $('input[name=txtPromocaoIdentifier]').val(),
                    nome: $('input[name=nomeP]').val(),
                    descricao: $('textarea[name=descricaoP]').val(),
                    tempoDePreparo: $('input[name=tempoDePreparoP]').val(),
                    dataTermino: $('input[name=dataTerminoP]').val(),
                    //imagem: $('input[name=imagemP]').val(),
                    preco: $('input[name=precoP]').val(),
                });
        });
        $('form[name=frmEditarImagemPromocao]').submit(function (e) {
            e.preventDefault();
            let img = $(this).find('input[name=imagemNovaPromocao]')[0].files[0];
            let frmEditarImagemProduto = this;

            $(frmEditarImagemProduto).find('button[type=submit]').addClass('disabled');
            if(validarTipoDeImagem(img)){
                let formData = new FormData();
                formData.append('imagem', img);
                new PromocaoController().actualizarPromocaoImagem(loja, {id: $('input[name=txtPromocaoIdentifier]').val()}, formData).done(function () {
                    $('div#modalEditarFotoPromocao.modal').modal('close');
                    $('div#modalEditarPromocao.modal').modal('close');
                    frmEditarImagemProduto.reset();
                    $(frmEditarImagemProduto).find('button[type=submit]').removeClass('disabled');
                });
            }else{
                M.toast({html: 'Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem.', classes: 'rounded'});
                $('form[name=frmEditarImagemProduto] button[type=submit]').removeClass('disabled');

            }
        });
        // -------------------- Editar Produto --------------------------------------------- ///

    }

    eliminarPromocao(loja){
        $('div#promocaoPag a.btnEliminarPromocao').click(function (e) {
            e.preventDefault();
            let $card = $(this).parents('div.sticky-action');

            $('span#txtEliminarPromocaoNome').text($card.find('span.nome').text());
            $('input[name=txtEliminarIdentifierPromocao]').val($card.find('span.identifier').text());
            $('div#modalEliminarPromocao.modal').modal('open');
        });

        //Todo verificar os campos
        $('form[name=frmEliminarPromo]').submit(function (e) {
            e.preventDefault();
            $(this).disabled=true;
            new PromocaoController().apagarPromocao(loja,{id:$('input[name=txtEliminarIdentifierPromocao]').val()});
        });
    }
}
export {PromocaoController}