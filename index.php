<!DOCTYPE html>
<html lang="pt-PT">
  <head>
      <meta charset="UTF-8">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>

    <body>




    <div id="tudo">
            <header>
                <nav>
                    <div class="nav-wrapper white">
                        <div class="row">
                            <div class="col s12">
                                <a href="#" class="brand-logo black-text">Vectis Food Loja</a>

                            </div>
                        </div>
                    </div>
                  </nav>
            </header>


            <main>
                <div class=" container" style="width:90%;">
                    <div class="row">
                        <div class="col s12">
                            <h5>CRIAR UMA CONTA</h5>
                            <p>Crie uma conta com apenas <b>3 passos</b>.</p>
                        </div>
                    </div>
                    <div class="row">
                                
                        <div class="col s12 m8 offset-m2 l6 offset-l3">

                                <nav>
                                    <div class="nav-wrapper orange darken-2">
                                          <div id="passos" class="col s12">
                                            <a  href="" class="breadcrumb">Passo 1</a>
                                          </div>
                                    </div>
                                </nav>


                                <form name="formLogin">
                                    <!--Passo 1 -->
                                    <div id="Passo1" >

                                        <div class="input-field col s12">
                                            <input name="nome" id="nome" type="text" class="validate">
                                            <label for="nome" >Nome do Estabelecimento</label>
                                        </div>
                            
                            
                                        <div class="input-field col s12">
                                            <input id="enderecoFisico" name="enderecoFisico" type="text" class="validate"> <!--placeholder="Bairo-rua">-->
                                            <label for="enderecoFisico" >Endereco Fisico</label>
                            
                                        </div>
                            
                            
                                        <div class="input-field col s12">
                                            <input autocomplete="11111" id="Senha" name="senha" type="password" class="validate">
                                            <label for="senha">Senha</label>
                                        </div>
                            
                                        <div class="input-field col s12">
                                            <input id="confirmar" type="password" class="validate">
                                            <label for="confirmar">Confirmacao da Senha</label>
                                        </div>

                                        <div class="input-field col s12">
                                            <select id="provincia" name="provincia" class="col s12">
                                                <option value="" disabled selected>PROVINCIA</option>
                                                <option value="HUILA" >HUILA</option>
                                            </select>
                                            <label for="provincia">Provincia</label>
                                        </div>

                                        <div class="input-field col s12">
                                            <select id="municipio" name="municipio" class="col s12">
                                                <option value="" disabled selected>MUNICIPO</option>
                                                <option value="Caconda">CACONDA</option>
                                                <option value="Cacula">CACULA</option>
                                                <option value="Caluquembe">CALUQUEMBE</option>
                                                <option value="Chiage">CHIANGE</option>
                                                <option value="Chibia">CHIBIA</option>
                                                <option value="Chicomba">CHICOMBA</option>
                                                <option value="Chipindo">CHIPINDO</option>
                                                <option value="Humpata">HUMPATA</option>
                                                <option value="Jamba">JAMBA</option>
                                                <option value="Kuvango">KUVANGO</option>
                                                <option value="Lubango">LUBANGO</option>
                                                <option value="Matala">MATALA</option>
                                                <option value="Quilengues">QUILENGUES</option>
                                                <option value="Quipungo">QUIPUNGO</option>
                                            </select>
                                            <label for="municipio">Municipio</label>
                                        </div>

                                        <div class="input-field col s12">
                                            <select id="categoria" name="categoria" class="col s12">
                                                <option value="" disabled selected>CATEGORIA</option>
                                                <option value="Restaurante">RESTAURANTE</option>
                                            </select>
                                            <label for="categoria">Categoria</label>
                                        </div>
                                        
                                    </div>
                                
                                    <!--Passo 2-->
                                    <div id="Passo2" class="hide">

                                        <div class="input-field col s12" >
                                            <input id="nomeDono" name="nomeDono" type="text" class="validate">
                                            <label for="nomeDono" >Nome do Proprietario</label>
                                        </div>
                        
                        
                                        <div class="input-field col s12">
                                            <input type="text" name="BIDono" id="BIDono" class="validate">
                                            <label for="BIDono" >Nº do BI </label>
                                        </div>
                        
                                        <div class="input-field col s12">
                                            <input id="emailDono" name="emailDono" type="email" class="validate">
                                            <label for="emailDono">Email do Proprietario</label>
                                            <span class="helper-text" data-error="Email invalido" data-success=" Email valido "></span>
                                        </div>
                        
                        
                        
                                        <div class="input-field col s12">
                                            <input type="number" name="telefoneDono" id="telefoneDono" class="validate">
                                            <label for="telefoneDono" >Numero de Telefone</label>
                                        </div>
                            
                                    </div>



                                    <div class="input-field right">
                                        <button id="btnSeguinte"  class="btn waves-effect waves-dark orange">SEGUINTE</button>
                                    </div>
                                    <br/>


                                    <!--Passo 3-->
                                    <div id="Passo3" class="hide">
                                        <div class="input-field col s12">
                                            <input id="email" name="email" type="email" class="validate">
                                            <label for="email">Email da loja</label>
                                        </div>
                                            <div class="input-field col s12">
                                            <input id="telefone" name="telefone" type="number" class="validate">
                                            <label for="telefone">Telefone da loja</label>
                                        </div>
                                        <div class="input-field col s12">
                                            <input id="conf" type="number" class="validate">
                                            <label for="conf">Código de donfirmação</label>
                                        </div>
                                        <div class="input-field right">
                                            <button  type="submit" id="btnFinalizar"  class="btn waves-effect waves-dark orange" >FINALIZAR</button>
                                        </div>
                                    </div>

                                </form>

                                
                        </div>

                        
                    </div>




                    <div class="fixed-action-btn">
                        <a class="btn-floating waves-effect btn-large red modal-trigger" href="#addProduto">
                            <i class="large material-icons">add</i>
                        </a>
                    </div>

                    <!-- Modal Structure -->
                    <div id="addProduto" class="modal">
                        <div class="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                    </div>
                    <!-- Modal Structure -->









                </div>
            </main>


        <footer class="page-footer orange lighten-1" style="margin: 0;">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Outros Servicos</h5>
                        <p class="grey-text text-lighten-4">Os nossos serviços ajudam a tornar a sua vida mais fácil.
                            Receba pagamentos por encomendas feitas por si, venda os seus produtosa ao maior número de pessoas possível e compre os produtos no melhor preço.
                        </p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Serviços Vectis Fast Food:</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="#">Loja</a></li>
                            <li><a class="grey-text text-lighten-3" href="#">Cliente</a></li>
                            <li><a class="grey-text text-lighten-3" href="#">Delivery</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright orange darken-1">
                <div class="container">
                    © 2019 Vectis Fast Food Loja todos os direitos reservados
                    <a class="grey-text text-lighten-4 right" href="#">Ir para o centro de ajuda</a>
                </div>
            </div>
        </footer>
        </div>

     
    <!-- jQuery first -->
    <script src="js/Libs/js/jquery-3.3.1.min.js"></script>
    <script src="js/Libs/js/materialize.min.js"></script>
    <script>

        $(document).ready(function(){
            $('select').formSelect();
        });
    </script>
    <script type="module" src="js/login.js"></script>
    
    
    
    
    <!------------------- Firebase App is always required and must be first ---------------------->
    <!--<script src="https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.7.3/firebase.js"></script>
    <script>
        $('.modal').modal();

        $('.fixed-action-btn').floatingActionButton({ hoverEnabled: false});






        // Initialize Firebase
        var config = {
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
    </script>-->
  </body>
</html>   
    