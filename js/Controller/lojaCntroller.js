//importScripts('../Models/entidades/Loja.js');
import '../Model/entidades/Loja';
import '../Model/entidades/servidor';

class LojaController{
    constructor(){
        this.loja = new Loja();
        this.servidor = new Servidor();
    }
    get obterTodasAsLojas(){
        this.servidor.requisitar('GET''')
    }
}