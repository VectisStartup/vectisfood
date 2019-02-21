import {ProdutoController} from "./Controller/PedidoController.js";
import {Servidor} from "./Model/entidades/Servidor.js";
import {PromocaoController} from "./Controller/PromocaoController.js";

let HOST = new Servidor().host;

let produtoController = new ProdutoController();
let promocaoController = new PromocaoController();


/// ------------------------- Index.html -----------------------------------////
// Controlo de sessao

var loja= sessionStorage.getItem('dadosLoja');

if (loja==null){
    location.replace('login.html');
}
loja = JSON.parse(loja);


//Verificacar a pagina utilizada no momento
function ler(){
    // ------------------------ main.html ----------------------------------- ///

    if($('div#mainPag').length !== 0){
        PaginaMain();
        console.log('main');
    }
    // ------------------------ pedidos.html ----------------------------------- ///
    else if($('div#pedidosPag').length !== 0){
        console.log('pedidos');
    }
    // ------------------------ promocao.html ----------------------------------- ///
    else if($('div#promocaoPag').length !== 0){
        PaginaPromocao();
        console.log('promocao');
    }
    // ------------------------ produtos.html ----------------------------------- ///
    else if($('div#produtoPag').length !== 0){
        PaginaProduto();
        console.log('produto');
    }else{
        console.log('principal');
    }
}


$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('main#principal').load('main.html', function () {
        $('div#IndexProgressBar').removeClass('active');
        PaginaMain();
    });
    //Definindo valores
    $('.sidenav a img.circle').attr('src', HOST+'/src/'+loja.logotipo);
    $('.sidenav a span.name').html(loja.nome);
    $('.sidenav a span.email').html(loja.email);

});


$('header .sidenav li a').bind('click', function (e) {
    $('.sidenav').sidenav('close');
    let pbIndex = $('div#IndexProgressBar');
    pbIndex.addClass('active');
    e.preventDefault();

    $(this).addClass('active');

    let pagina = $(this).attr("href").replace("#", "");

    if(pagina == null){

    }else if(pagina === "modalSair"){

    }else{
        $('main').load(pagina+'.html', function () {
            ler();
            $('title').html(pagina.toUpperCase());
            $('.modal').modal();

            $('.fixed-action-btn').floatingActionButton({ hoverEnabled: false});
        });
    }
    pbIndex.removeClass('active');

});

//--- Online/Offline --------//
$('header input[name=ckbOnline]').bind('click', function (e) {
    if(e.checked){
        //Todo Online
    }else{
        // Todo Offline
    }
    //console.log('online: ', e.target.checked);
});

// ------------------------ main.html ----------------------------------- ///
function PaginaMain() {
    $('#mainPag img#logotipo').attr('src', HOST+'/src/'+loja.logotipo);
    $('#mainPag b#txtNomeLoja').html(loja.nome);
    $('#mainPag div#txtCategoriaLoja').html(loja.categoria);
    $('#mainPag div#txtEmailLoja').html(loja.email);
    $('#mainPag p#txtMissao').html(loja.missao);
    $('#mainPag p#txtVisao').html(loja.visao);
}
// ------------------------ main.html ----------------------------------- ///


// ------------------------- Produto.html ------------------------------- //
function PaginaProduto() {
    produtoController.obterProdutosDaLoja(loja);
}
//console.log($('a.eliminar').parent().id);
// ------------------------- Promocao.html ------------------------------- //
function PaginaPromocao() {
    promocaoController.obterTodasAsDaPromocoesLoja(loja);
}

// ------------------------- Firebase.js --------------------------------- //

// Initialize Firebase
let config = {
    apiKey: "AIzaSyDItHexxmG-1NjPPq_v8eWqK-i8bZWZybI",
    authDomain: "vectisfood-2b3f6.firebaseapp.com",
    databaseURL: "https://vectisfood-2b3f6.firebaseio.com",
    projectId: "vectisfood-2b3f6",
    storageBucket: "vectisfood-2b3f6.appspot.com",
    messagingSenderId: "619499966458"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BAVw2gGjtVwbBy41MF-vMXXqQRQQhoUB0aEI05_8eteJhtBIJ_WehN43tenUl8L-koSX7ThpERt3V8TqSUsekvI");


messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    getToken();
}).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
});


function getToken(){
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            //Todo Guardar o token na base de dados
            console.log('token: ', currentToken);
        } else {
            console.log('No Instance ID token available. Request permission to generate one.');
        }
    }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
    });
}


messaging.onTokenRefresh(function() {
    getToken();
});



messaging.onMessage(function(payload) {

    $('.modal h4').html(payload.notification.title);
    $('.modal p').html(payload.notification.body);
    $('#addProduto').modal('open');
    console.log('Message received. ', payload);
});
