// ------------------------- Geral Helper --------------------------------- //
function validarTipoDeImagem(file) {

    let fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    if(file != null || file !== undefined){
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }
    return true;
}
function tratarCategoria(categoria) {
    switch (categoria){
        case '0': return 'Comida';
        case '1': return 'Bebida';
        default: return categoria;
    }
}
function jsonReplacer(key, value){
    // Filtering out properties
    if (typeof value === null) {
        return undefined;
    }
    return value;
}
function retirarRodape() {
    $('footer').addClass('hide');
}
function colocarRodape() {
    $('footer').removeClass('hide');
}
function estadoPedidoToText(estadoPedido){
    switch (estadoPedido){
        case '0': return {estado: "negado", corClasse: "black"} ;
        case '1': return {estado: "cancelado", corClasse: "red"} ;
        case '2': return {estado: "em preparo", corClasse: "orange"} ;
        case '3': return {estado: "em andamento", corClasse: "yellow darken-1"} ;
        case '4': return {estado: "entregue", corClasse: "green"} ;
        default: return {estado: "", corClasse: "blue pulse circle"};
    }
}
function formaDePagamento(forma) {
    switch (forma){
        /*case '0': return {estado: "negado", corClasse: "black"} ;
        case '1': return {estado: "cancelado", corClasse: "red"} ;
        case '2': return {estado: "em preparo", corClasse: "orange"} ;
        case '3': return {estado: "em andamento", corClasse: "yellow darken-1"} ;
        case '4': return {estado: "entregue", corClasse: "green"} ;*/
        default: return forma;
    }
}
function PHPdateTime(text) {
    for (var i = 0; i<=text.length; i++){
        if(text.charAt(i)==='d') text = text.replace(/d/gi, Number(new Date().getDate())<10?'0'+(new Date().getDate()):new Date().getDate());
        if(text.charAt(i)==='m') text = text.replace(/m/gi, Number(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1);
        if(text.charAt(i)==='Y') text = text.replace(/Y/gi, new Date().getFullYear());
        if(text.charAt(i)==='i') text = text.replace(/i/gi, new Date().getMinutes());
        if(text.charAt(i)==='h') text = text.replace(/h/gi, new Date().getHours());
        if(text.charAt(i)==='s') text = text.replace(/s/gi, new Date().getSeconds());
    }
    return text;
}
export {validarTipoDeImagem, jsonReplacer, colocarRodape, retirarRodape, tratarCategoria, estadoPedidoToText, PHPdateTime}