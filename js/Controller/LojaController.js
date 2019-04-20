import { Loja } from "./../Model/entidades/Loja.js";
import {Servidor} from "./../Model/entidades/Servidor.js";
import {validarTipoDeImagem, jsonReplacer} from "./GeralHelper.js";


class LojaController{
    constructor(){
        this.loja = new Loja();
        this.servidor = new Servidor();
    }

    //email e senha
    login(dados){
        this.servidor.requisitar('GET','/lojas', dados, function () {
            $('div#LoginProgressBar').show();
        }, function(data, textStatus, xhr){
            sessionStorage.setItem('dadosLoja', xhr.responseText);
            document.location.replace('main.html');
        }, function () {
            $('span#resposta').html('Email ou senha errada');
        }, function () {
            $('div#LoginProgressBar').hide();
        });
    }

    obterLojaPeloId(loja){
        return this.servidor.requisitar('GET','/lojas/'+loja.id, null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    criarLoja(loja){
        let dados = JSON.stringify(loja, jsonReplacer);
        this.servidor.requisitar('POST','/lojas', dados, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarLogo(loja, foto){
        return this.servidor.requisitar('POST','/lojas/'+loja.id+'/logos', foto, function () {

        }, function () {

        }, function () {

        }, function () {

        }, true)
    }
    actualizarLoja(loja){
        let dados = {};
        dados = Object.assign(dados,loja);
        dados.id = undefined;
        return this.servidor.requisitar('PUT','/lojas/'+loja.id, JSON.stringify(dados, jsonReplacer), function () {

        }, function () {


        }, function () {
            M.toast({html: 'Erro. Por favor, tente mais tarde. ', classes: 'rounded'});


        }, function () {

        });
    }
}
export {LojaController};
