import { Loja } from "./../Model/entidades/Loja.js";
import {Servidor} from "./../Model/entidades/Servidor.js";


 class LojaController{
    constructor(){
        this.loja = new Loja();
        this.servidor = new Servidor();
    }
    //email e senha
    login(formulario){
        var response = this.servidor.requisitar('GET','/lojas',formulario);
        //Adicionar os eventos
        response.onreadystatechange=function(){
            if(response.readyState<4){
                console.log("Aguarde..");
            }
            if(response.readyState==4){
                console.log('login: ', response.responseText);
            }
        };
    }
    obterTodasAsLojas(){
        var response = this.servidor.requisitar('GET','/lojas',null);
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
    obterLojaPeloId(id){
        var response = this.servidor.requisitar('GET','/lojas/'+id, null);
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
    obterLojasPelaCategoria(categoria){
        var response = this.servidor.requisitar('GET','/lojas/'+categoria, null);
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

    criarLoja(loja){
        var response = this.servidor.requisitar('POST','/lojas',loja);
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
    actualizarLogo(loja, dados){
        var response = this.servidor.requisitar('POST','/lojas/'+loja.id+'/logos',dados);
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
    actualizarLoja(loja){
        var response = this.servidor.requisitar('PUT','/lojas/'+loja.id,loja);
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
export {LojaController};
