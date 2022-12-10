
    let w = document.querySelectorAll(".content-wrapper");
    for (let i = 0; i < w.length; i++) {
        let c = w[i].querySelectorAll(".content");
        $(c).slice(0,3).show();
    }

    function a(button){
        const number = 3;
        let contentWrapper = button.parentNode.parentNode;
        let contents = $(contentWrapper).find('.content:hidden');
        contents.slice(0, number).slideDown();
        if(contents.length <= number){
            button.innerHTML = "Mais nada para mostrar";
            button.classList = "show-more noContent";
        }
    }