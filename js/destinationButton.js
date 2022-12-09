$(document).on('click', '[name="boleia-location"]', function(e) {
    e.stopPropagation();
    let destino = document.getElementById("inputDestino");
    let origem = document.getElementById("inputOrigem");


    if(this.id === "destino-ismat"){
        origem.value = "";
        destino.value = "ISMAT";
        destino.disabled = true;
        origem.disabled = false;
    }else {
        destino.value= "";
        origem.value = "ISMAT";
        origem.disabled = true;
        destino.disabled = false;
    }

    // add class active to current button and remove it from the siblings
    $(this).toggleClass('active')
        .siblings().not(this).removeClass('active');
})