import {Servidor} from "./../Model/entidades/Servidor.js";
import {validarTipoDeImagem, jsonReplacer, tratarCategoria} from "./GeralHelper.js";

class ProdutoController{
    constructor(){
        this.servidor = new Servidor();
        this.initialized = false;
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre)
    obterProdutosDaLoja(loja){
        this.servidor.requisitar('GET','/lojas/'+loja.id+'/produtos', null, function () {
            $('div#IndexProgressBar').addClass('active');
        }, function(data, textStatus, xhr){
            let produtosUI;

            if(xhr.status === 204){
                produtosUI = '<div class="col s12 center-align"><span class="grey-text">Ainda não tem nenhum produto na prateleira</span> </div>';
                M.toast({html: 'Ainda não tem produtos na prateleira', classes: 'rounded'});
            }else{
                produtosUI = ProdutoController.produtoAdapter(JSON.parse(xhr.responseText));
            }

            $('div#produtosContainer').html(produtosUI);
            new ProdutoController().init(loja);





        }, function () {
            M.toast({html: 'Erro ao conectar com o servidor!', classes: 'rounded'});
        }, function () {
            $('div#IndexProgressBar').removeClass('active');
        });
    }

    apagarProduto(loja, produto) {
        this.servidor.requisitar('DELETE','/lojas/'+loja.id+'/produtos/'+produto.id, null, function () {
            //Todo ProgressBar
        }, function (data, textStatus, xhr) {
            M.toast({html: 'Produto Apagado!', classes: 'rounded'});
            $('#modalEliminarProduto').modal('close');

            new ProdutoController().obterProdutosDaLoja(loja);
        }, function () {

        }, function () {

        });
    }
    criarProduto(loja, produto){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/produtos',produto, function () {

        }, function (data, textStatus, xhr) {
            M.toast({html: 'Produto Criado!', classes: 'rounded'});
            $('#ModalAddProduto').modal('close');

            new ProdutoController().obterProdutosDaLoja(loja);
        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
    actualizarProduto(loja, produto){
        console.log('produto: ', produto);
        let comImagem = false;
        let prod = Object.assign({},produto);
        delete produto.id;

        return this.servidor.requisitar('PUT','/lojas/'+loja.id+'/produtos/'+prod.id , JSON.stringify(produto), function () {

        }, function () {
            M.toast({html: 'Alterações Guardadas!', classes: 'rounded'});
            new ProdutoController().obterProdutosDaLoja(loja);
        }, function () {
            M.toast({html: 'Erro ao guardar as alterações. Tente novamente', classes: 'rounded'});
        }, function () {

        }, /*comFoto*/ comImagem);
    }
    actualizarProdutoImagem(loja, frmDataImagem, produto = null){


        return this.servidor.requisitar('POST','/lojas/'+loja.id+'/produtos/'+produto.id+'/imagens' , frmDataImagem, function () {

        }, function () {
            M.toast({html: 'Alterações Guardadas!', classes: 'rounded'});
            new ProdutoController().obterProdutosDaLoja(loja);
        }, function () {
            M.toast({html: 'Erro ao guardar as alterações. Tente novamente', classes: 'rounded'});
        }, function () {

        }, /*comFoto*/ true);
    }

    init(loja){
        if(!this.initialized){
            this.initialized = true;
            new ProdutoController().editarProduto(loja);
            new ProdutoController().eliminarProduto(loja);
        }
    }

    //Utils
    static produtoAdapter(produtosArray){
    //<a href="#" class="btnEditarProduto">EDITAR</a>
        let produtosUI = " ";
        produtosArray.forEach(function (produto) {
            produtosUI +=`<div class="col s12 m6 l3">
                            <div class="card sticky-action">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${produto.imagem}">
                                <span class="hide identifier">${produto.id}</span>
                                </div>
                                <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4"><span class="nome">${produto.nome}</span><i class="material-icons right">keyboard_arrow_up</i></span>
                            <p class="preco">${produto.preco} kz</p>
                            </div>
                            <div class="card-action" id="${produto.id}">
                                <a class="btnEliminarProduto" href="#">ELIMINAR</a>
                                <a href="#" class="btnDetalhesProduto">Detalhes</a>
                                </div>
                                <div class="card-reveal">
                                    <span class="card-title grey-text text-darken-4">${produto.nome}<i class="material-icons right">keyboard_arrow_down</i></span>
                                    <p>Descrição: <span class="descricao">${produto.descricao}</span></p>
                                    <p>Categoria: <span class="categoria">${tratarCategoria(produto.categoria)}</span></p>
                                    <p>Tempo de preparo: <span class="tempo">${produto.tempoDePreparo}</span></p>
                                    <p>Preço: <span class="preco">${produto.preco}</span>kz</p>
                                </div>
                            </div>
                    </div>`;
        });


        return produtosUI;

    }

    editarProduto(loja){
        let produto = {};

        $('input[name=nomeP]').change(function (e) {
            produto.nome = $('input[name=nomeP]').val();
        });
        $('select[name=categoriaP]').change(function (e) {
            produto.categoria = $('select[name=categoriaP]').val();
        });
        $('textarea[name=descricaoP]').change(function (e) {
            produto.descricao = $('textarea[name=descricaoP]').val();
        });
        $('input[name=tempoDePreparoP]').change(function (e) {
            produto.tempoDePreparo = $('input[name=tempoDePreparoP]').val();
        });
        $('input[name=precoP]').change(function (e) {
            produto.preco = $('input[name=precoP]').val();
        });
        // -------------------- Editar Produto --------------------------------------------- ///
        //Todo Refatorar e tratar a imagem
        function exibirDadosNoFormEditarProduto(btnDetalhesProduto) {
            let $card = $(btnDetalhesProduto.target).parents('div.sticky-action');


            $('input[name=nomeP]').val($card.find('span.nome').html());
            $('input[name=txtProdutoIdentifier]').val($card.find('span.identifier').text());
            $('img[name = imagemP]').attr('src', $card.find('img.activator').attr('src'));

            $('select[name=categoriaP]').find(`option[value|='${tratarCategoria($card.find("span.categoria").html())}']`).prop('selected', 'true');


            $('textarea[name=descricaoP]').val($card.find('span.descricao').html());

            $('input[name=tempoDePreparoP]').val($card.find('span.tempo').html());
            //Todo Guardar com imagem
            $('input[name=precoP]').val(parseInt($card.find('span.preco').html()));


            $('select').formSelect();

        }


        $('div#produtoPag a.btnDetalhesProduto').click(function (e) {
            e.preventDefault();

            exibirDadosNoFormEditarProduto(e);

            produto = {
                id: $('input[name=txtProdutoIdentifier]').val(),
                nome: $('input[name=nomeP]').val(),
                categoria: $('select[name=categoriaP]').val(),
                descricao: $('textarea[name=descricaoP]').val(),
                tempoDePreparo: $('input[name=tempoDePreparoP]').val(),
                preco: $('input[name=precoP]').val()
            };
            //exibir dados do produto nos detalhes
            $('div#ModalDetalhesProduto img#imagemD').attr('src', $(this).parents('div.sticky-action').find('img.activator').attr('src'));
            $('div#ModalDetalhesProduto span#nomeD').text(produto.nome);
            $('div#ModalDetalhesProduto span#precoD').text(produto.preco.toString());
            $('div#ModalDetalhesProduto span#tempoDePreparoD').text(produto.tempoDePreparo);
            $('div#ModalDetalhesProduto span#categoriaD').text(tratarCategoria(produto.categoria));

            $('div#ModalDetalhesProduto.modal').modal('open');
        });

        $('form[name=frmDetalhesProduto]').submit(function (e) {
            e.preventDefault();
            $(this).parents('div#ModalDetalhesProduto.modal').modal('close');
            $('div#modalEditarProduto.modal').modal('open');
        });


        $('form[name=frmEditarProduto]').submit(function (e) {
            e.preventDefault();
            $(e.target).addClass('disabled');
            //Todo Verificacao dos campos

            new ProdutoController().actualizarProduto(loja, produto)
                .done(function (data, statusText, xhr) {
                    $('div#modalEditarProduto.modal').modal('close');
                });
        });

        $('form[name=frmEditarImagemProduto]').submit(function (e) {
            e.preventDefault();
            $(this).find('button[type=submit]').addClass('disabled');
            let frmEditarImagemProduto = this;
            let img = $(this).find(' input[name=imagemNovaProduto]')[0].files[0];

            if(validarTipoDeImagem(img)){
                let formData = new FormData();
                formData.append('imagem', img);
                new ProdutoController().actualizarProdutoImagem(loja, formData, {id: $('input[name=txtProdutoIdentifier]').val()}).done(function () {
                    $('div#modalEditarFotoProduto.modal').modal('close');
                    $('div#modalEditarProduto.modal').modal('close');
                    frmEditarImagemProduto.reset();
                    $(frmEditarImagemProduto).find('button[type=submit]').removeClass('disabled');
                });
            }else{
                M.toast({html: 'Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem.', classes: 'rounded'});
                $(frmEditarImagemProduto).find('button[type=submit]').removeClass('disabled');

            }
        });
        // -------------------- Editar Produto --------------------------------------------- ///
    }
    eliminarProduto(loja){

        // -------------------- Eliminar Produto --------------------------------------------- ///
        $('div#produtoPag a.btnEliminarProduto').click(function (e) {
            e.preventDefault();
            let $card = $(this).parents('div.sticky-action');

            $('span#txtEliminarProdutoNome').text($card.find('span.nome').text());
            $('input[name=txtEliminarIdentifier]').val($card.find('span.identifier').text());
            $('div#modalEliminarProduto.modal').modal('open');
        });
        $('form[name=frmEliminar]').submit(function (e) {
            e.preventDefault();
            $(e.target).disabled=true;
            //Todo Eliminar Produto
            new ProdutoController().apagarProduto(loja,{ id: $('input[name=txtEliminarIdentifier]').val()});
        })

        // ---------------------- Eliminar Produto ------------------------------------------- //

    }
}
export {ProdutoController}