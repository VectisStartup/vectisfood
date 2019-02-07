import { LojaController } from "./Controller/LojaController.js";
import {Pagina} from "./Controller/arquivos.js";


function loading(){
    console.log("carregando");
}

function loaded(status, responseText){
        console.log("200", responseText);
}
function failure(status, responseText){
    console.log(status, responseText);
}
//// Carregamento de paginas

/*btnEntrar.addEventListener('click', function() {
    btnEntrar.disabled = true;
    var login = document.forms.login;
    console.log('sd');
    
    if( !(login['email'].value == '') && !(login['senha'].value == '')){
        var lojaController = new LojaController();
        var resp = lojaController.login(login, loading, loaded, failure);
        
        
        
    } 
});*/

/// Login



/// ------------------------ Criar Conta ----------------------------------////
var passo =1;

$('button#btnSeguinte').bind("click", function (e) {
    e.preventDefault();
    e.target.disabled=true;
    if(passo===1){
        $('div#passos').last().append('<a href="" class="breadcrumb">Passo 2</a>');
        $('div#Passo1').addClass('hide');
        $('div#Passo2').removeClass('hide');
        console.log("passo 1");
        passo++;
    }else if(passo ===2){
        $('div#passos').last().append('<a href="" class="breadcrumb">Passo 3</a>');
        $('div#Passo2').addClass('hide');
        $('div#Passo3').removeClass('hide');
        $(this).hide();
        passo++;
        console.log('Passo 2');
    }
    e.target.disabled=false;
});
$('form[name=formLogin]').submit(function (e){
    e.preventDefault();
    // Todo: Verificações no formulário
    $('button[type=submit]').disabled = true;

    console.log($(this).serialize());
    $('main').load('1useKamba.html');


    // Todo: Verificações no formulário

    $('button[type=submit]').disabled = true;
})
