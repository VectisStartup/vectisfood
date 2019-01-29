import { Produto } from "./../Model/entidades/Produto.js";
import {Servidor} from "./../Model/entidades/Servidor.js";

class ProdutoController{
    constructor(){
        this.Produto = new Produto();
        this.Servidor = new Servidor();
    }

    obterProdutosDaLoja(loja){
        var response = this.servidor.requisitar('GET','/lojas/'+loja.id+'/produtos', null);
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
    obterUmProdutoDaLoja(produto){
        var response = this.servidor.requisitar('GET','/lojas/'+produto.idLoja+'/produtos/'+produto.id, null);
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
    criarProduto(loja, dados){
        var response = this.servidor.requisitar('POST','/lojas/'+loja.id+'/produtos', dados);
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
    actualizarProduto(produto){
        var response = this.servidor.requisitar('PUT','/lojas/'+produto.idLoja+'/produtos/'+produto.id, null);
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
    actualizarLogoProduto(produto, dados){
        var response = this.servidor.requisitar('POST','/produtos/'+produto.id+'/logos', dados);
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
    apagarProduto(produto){
        var response = this.servidor.requisitar('DELETE','/lojas/'+produto.idLoja+'/produtos/'+produto.id);
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