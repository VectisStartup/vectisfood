//Model

class Loja{
    constructor(){
        this.id;
        this.nome;
        this.provicia;
        this.municipio;
        this.telefone;
        this.senha;
        this.logotipo;
        this.entrada;
        this.saida;
        this.criacao;
        this.email;
        this.NIF;
        this.emailDono;
        this.telefoneDono;
        this.BIDono;
        this.fcmToken;
        this.kambaIdReceiver;
        this.latitude;
        this.longitude;
        this.endereco;
        this.categoria;
        this.bloqueada;
        this.online;
        this.dataDeCriacao;
    }


}
class Servidor{
    constructor(){
        this.host='http://localhost/www/vectis/api/v1';
    }
    requisitar(metodo, router, dados, loading, success, failure, sempre){
        $.ajax(
            {
                method: metodo,
                url:this.host+router,
                data: dados,
                beforeSend: loading(),
                statusCode: {
                    200:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    },
                    201:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    }

                }
            })
            .fail(function() {
                failure();
            })
            .always(function() {
                sempre();
            });
    }
}

//Controller
class LojaController{
    constructor(){
        this.loja = new Loja();
        this.servidor = new Servidor();
    }

    //email e senha
    login(dados){
        this.servidor.requisitar('GET','/lojas', dados, function () {
            $('div#LoginProgressBar').toggleClass('hide');
            $('button#btnLogin').attr('disabled', 'disabled');
        }, function(data, textStatus, xhr){
            sessionStorage.setItem('dadosLoja', xhr.responseText);
            document.location.replace('index.html');
        }, function () {
            $('span#resposta').html('Email ou senha errada');
        }, function () {
            $('div#LoginProgressBar').toggleClass('hide');
            $('button#btnLogin').prop('disabled', false);
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

let lojaController = new LojaController();



/// ------------------------ Criar Conta ----------------------------------////
$('form[name=formCriarConta]').submit(function (e){
    e.preventDefault();
    var $btn = $('button[type=submit]');
    $btn.disabled = true;

    //Verificando campos vasios
    // Todo: Verificações no formulário
    var CamposVasios = 0;
    $(this).each(function (indice, elemento) {
        if(elemento.value == null){
            console.log("existem campos vasios: ");
            CamposVasios = 1 ;
        }
    });
    CamposVasios =0 ;
    //Enviando os dados
    var $json = "";
    if(!CamposVasios){
        //TODO: Transformar em JSON
        //TODO: Funcoes de data

        var dateTime = new Date();

        var loja ={
            id: null,
            nome: $('input#nome').val(),
            provicia: $('#provicia').val(),
            municipio: $('#municipiod').val(),
            telefone: $('#telefoned').val(),
            senha: $('#senhad').val(),
            email: $('#emaild').val(),
            NIF: $('#NIFd').val(),
            nomeDono: $('#nomeDonod').val(),
            emailDono: $('#emailDonod').val(),
            telefoneDono: $('#telefoneDonod').val(),
            BIDono: $('#BIDonod').val(),
            endereco: $('#enderecod').val(),
            categoria: $('#categoriad').val(),
            dataDeCriacao: dateTime.getFullYear()+'/'+dateTime.getMonth()+'/'+  new Date().getTime()
        };

        console.log(loja);



        //$('main').load('1useKamba.html');



        $btn.disabled = false;
    }

});


//// ------------------------ Login ---------------------------------------////
$('form[name=formLogin]').submit(function(e){
    e.preventDefault();
    let $btnLogin = $('button#btnLogin');
    $btnLogin.disabled = true;
    //Todo Verificacao
    $(this).each(function (i, e) {
        if(e.value == null){
            console.log("nenhum dos campos pode ser vasio");
        }
    });
    lojaController.login($(this).serialize());

    $btnLogin.disabled = false;
});

