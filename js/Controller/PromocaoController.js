import {Promocao} from ('./../Model/entidades/Promocao.js');
import {Servidor} from ('./../Model/entidades/Servidor.js');

class PromocaoController{
    constructor(){
        this.promocao = new Promocao();
        this.servidor = new Servidor();
    }
    obterTodasAsPromocoes(loja){
        var response = this.servidor.requisitar('GET','/lojas/'+loja.id+'/promocoes', null);
        //Adicionar os eventos
        response.onreadystatechange=function(){
            if(response.readyState<4){
                console.log("Aguarde..");
            }
            if(response.readyState==4){
                console.log('Resposta: ', response.responseText);
            }
        };
    }
    obterPromocao(loja){
        var response = this.servidor.requisitar('GET','/promocoes/'+loja.id, null);
        //Adicionar os eventos
        response.onreadystatechange=function(){
            if(response.readyState<4){
                console.log("Aguarde..");
            }
            if(response.readyState==4){
                console.log('Resposta: ', response.responseText);
            }
        };
    }
    criarPromocao(loja, dados){
        var response = this.servidor.requisitar('POST','/lojas/'+loja+'/promocoes', dados);
        //Adicionar os eventos
        response.onreadystatechange=function(){
            if(response.readyState<4){
                console.log("Aguarde..");
            }
            if(response.readyState==4){
                console.log('Resposta: ', response.responseText);
            }
        };
    }
    actualizarPromocao(loja, dados){
        var response = this.servidor.requisitar('PUT','/promocoes/'+loja.id, dados);
        //Adicionar os eventos
        response.onreadystatechange=function(){
            if(response.readyState<4){
                console.log("Aguarde..");
            }
            if(response.readyState==4){
                console.log('Resposta: ', response.responseText);
            }
        };
    }
}