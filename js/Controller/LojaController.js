import { Loja } from "./../Model/entidades/Loja.js";
import {Servidor} from "./../Model/entidades/Servidor.js";


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
            localStorage.setItem('dadosLoja', xhr.responseText);
            document.location.replace('main.html');
        }, function () {
            $('span#resposta').html('Email ou senha errada');
        }, function () {
            $('div#LoginProgressBar').hide();
        });
    }

    obterLojaPeloId(id){
        this.servidor.requisitar('GET','/lojas/'+id, null, function () {

        }, function () {

        }, function () {

        });
    }
    criarLoja(loja){
        this.servidor.requisitar('POST','/lojas',loja, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarLogo(loja, foto){
        this.servidor.requisitar('POST','/lojas/'+loja.id, foto, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarLoja(loja){
        this.servidor.requisitar('PUT','/lojas/'+loja.id, loja, function () {

        }, function () {

        }, function () {

        });
    }
}
export {LojaController};
