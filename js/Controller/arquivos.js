
class Pagina{
    
    constructor(){
        
    }
    //static Host = "http://localhost/www/vectis/website/php/";
    static irPara(pagina){
        var rest = new XMLHttpRequest();
        rest.open('GET' , host+pagina, true);
        rest.send();
        rest.onreadystatechange= function() {
            if(rest.readyState <4){
                console.log('read');
            }else if(rest.readyState === 4 && rest.status === 200){
                return rest.responseText;
            }
            
        }
    }
} export {Pagina};