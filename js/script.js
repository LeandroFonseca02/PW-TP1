function createStar(div,score){
    let star;
    if(score >= 0 && score < 0.5){
        star = "star";
    }else if(score >= 0.5 && score < 1){
        star = "star-half";
    }else if(score === 1){
        star = "star-fill";
    }
    let img = document.createElement("img");
    img.src="./images/icons/" + star + ".svg";
    img.alt=star;
    img.style.height = "28px";
    div.appendChild(img);
}

function getStarScore(rating){
    var array = [];
    let a = rating;
    for (let i = 0; i < 5; i++) {
        if (a>=1){
            array.push(1);
        }else if (a>=0.5 && a<1){
            array.push(a);
        }else if (a>=0 && a<0.5){
            array.push(a);
        }else {
            array.push(0);
        }
        a--;
    }
    return array;
}

function starRatingGenerator(element,rating){
    let div = document.createElement('div');
    element.appendChild(div)
    let array = getStarScore(rating);
    for (let i = 0; i < 5; i++) {
        createStar(div,array[i]);
    }

}

function changeExpandIcon(element) {
    element.src = (element.src.includes('icon-down.svg')) ? './images/icons/icon-up.svg' : './images/icons/icon-down.svg';
}

function debugStarRating(){
    let rating = document.querySelectorAll(".rating-wrapper")
    for (let i = 0; i < rating.length; i++) {
        let inputs = rating[i].querySelectorAll("input");
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked === true){
                console.log("Rating " + (i+1) + ": valor " + inputs[j].value)
            }
        }
    }
}
function createStarRating(id,number){
    const element = document.getElementById(id);
    const div = document.createElement("div");
    div.className = "rating-wrapper";
    for (let i = 0; i < 5; i++) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "star-rating"+number;
        input.id = input.name+"-"+i;
        input.value = 5-i;
        let label = document.createElement("label");
        label.htmlFor = input.id;
        let star = document.createElement("i");
        star.classList = "fas fa-star d-inline-block";
        div.appendChild(input);
        div.appendChild(label)
        label.appendChild(star);
    }
    element.appendChild(div);
    element.appendChild(document.createElement("br"));
}