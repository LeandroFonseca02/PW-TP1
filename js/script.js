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
    let img = element.querySelector("img");
    img.src = (img.src.includes('icon-down.svg')) ? './images/icons/icon-up.svg' : './images/icons/icon-down.svg';
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

function createProfileModal(cardId,passengerID,user,parentDiv){
    let modal = `<div class="modal fade" id="${"profileCard"+cardId+"-"+passengerID}"
        data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="${"profileCardLabel"+cardId+"-"+passengerID}"
        aria-hidden="true">
            <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="${"profileCard"+cardId+"-"+passengerID}">Perfil</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <div class="col d-flex flex-column">
                              <div class="col mb-3">
                                  <div class="col d-flex flex-column  align-items-center bg-light perfil-caixa justify-content-center h-100">
                                      <div class="col d-flex flex-column justify-content-center align-items-center justify-content-center mt-2">
                                          <div class="mt-2">
                                              <img src="${user.photo}" alt="mdo" class="rounded-circle profile-image">
                                          </div>
                                      </div>
                                      <div class="d-flex mb-3">
                                          <h5>${user.firstName + " " + user.lastName}</h5>
                                      </div>

                                  </div>
                              </div>

                              <div class="col mb-3">
                                  <div class="col d-flex flex-column  align-items-center bg-light perfil-caixa justify-content-center h-100">
                                      <h5 class="mt-2">Avaliação:</h5>
                                      <div class="mt-2 mb-2" id="${"profileCardAvaliacao"+cardId+"-"+passengerID}"></div>
                                  </div>
                              </div>

                              <div class="col d-flex flex-column bg-light perfil-caixa">
                                  <div class="mt-2 mb-3 ms-2">
                                      <h5>Dados Pessoais</h5>
                                  </div>
                                  <div class="col d-flex flex-column justify-content-center mb-1">
                                      <div class="row g-3 ms-1">
                                          <div class="col-8">
                                              <label>Endereço de email</label>
                                              <h5>${user.email}</h5>
                                          </div>
                                          <div class="col-4">
                                              <label>Telemóvel</label>
                                              <h5>${user.phoneNumber}</h5>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>`;

    parentDiv.innerHTML += modal;
    let avaliacao = document.getElementById("profileCardAvaliacao"+cardId+"-"+passengerID);
    starRatingGenerator(avaliacao,user.rating);
}

function createCard(idCard, data, parentDiv) {
    let passengers = data.passengers;
    let card = `
        <div class="card boleia-card boleia-card-shadow mt-5">
            <div class="card-body">
                <div class="d-flex flex-row boleia-header align-items-center gap-4">
                    <img class="ms-4 d-none d-md-block car-card-image" src="./images/car-placeholder.png" alt="Car">
                    <div class="col">
                        <div class="align-self-start">${data.origem} - ${data.destino}</div>                       
                    </div>
                    <div class="col">${data.status}</div>
                    <div class="">${data.date}</div>
                    <div class=""> ${data.hour}</div>
                    <div class="">
                        <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target=${"#cardContent" + idCard}
                                aria-expanded="false" aria-controls=${"#cardContent" + idCard}
                                onclick="changeExpandIcon(this)">
                            <img src="./images/icons/icon-down.svg" style="height: 24px" alt="expandir">
                        </button>
                    </div>
                </div>
    
                <div id=${"modals" + idCard}></div>
            </div>
    
    
            <div class="collapse" id="${"cardContent" + idCard}">
                <div class="card-blocker"></div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div class="table-responsive text-nowrap">
                            <table class="text-nowrap w-auto">
                                <tbody>
                                ${passengers.map((user,index) =>
        `
                                    <tr>
                                        <td>
                                            <a href="" data-bs-toggle="modal" data-bs-target="${"#profileCard"+idCard+"-"+ index}">
                                                <img class="ms-4 p-2 me-2 rounded-circle card-profile-image" src="${user.photo}"
                                                     alt="Profile Image">
                                            </a>
                                        </td>
                                        <td class="ps-3">${user.firstName}</td>
                                        <td>
                                            <div class="ms-5" id="${"cardContentAvaliacao"+idCard+index}"></div>
                                        </td>
                                        <td>
                                            <div id="${"cardContentRemove"+idCard+index}"></div>
                                        </td>
                                    </tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                    <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="card-header">
                                Descrição
                            </div>
                            <div class="card-body">
                                <p>Veículo:<br>
                                    &emsp; Marca: ${data.vehicle.marca}<br>
                                    &emsp; Modelo: ${data.vehicle.modelo}<br>
                                    &emsp; Cor: ${data.vehicle.cor}<br>
                                    &emsp; Matrícula: ${data.vehicle.matricula}<br>
                                    Preço: ${data.pricePerPassenger}<br>
                                    ${data.description}
                                    </p>
                            </div>
                        </div>
                        <div class="mt-3 px-1">
                            <p>Lugares Disponíveis: ${data.nrLugaresDisponiveis - data.passengers.length}</p>
                        </div>
                    </div>
    
                </div>
                <div class="card-blocker"></div>
                <div class="d-flex flex-row-reverse">
                    <div class="me-4">
                        <button type="button" class="btn-ismat-large">Reservar</button>
                    </div>
                </div>
                <div class="card-blocker"></div>
            </div>
        </div>`;

    parentDiv.innerHTML += card;
    let string = "#cardContentAvaliacao" + idCard;
    let modals = "#modals" + idCard
    for (let i = 0; i < passengers.length; i++) {
        let avaliacao = document.querySelector(string+i);
        starRatingGenerator(avaliacao,passengers[i].rating);
        createProfileModal(idCard,i,passengers[i],document.querySelector(modals));
    }
}

function createProfile(user) {
    document.querySelector("#profileName").innerText = user.firstName + " " + user.lastName;
    document.querySelector("#profileImage").src = user.photo;
    starRatingGenerator(document.getElementById("profileRating"),user.rating);
    document.querySelector("#floatingEmail").value = user.email;
    document.querySelector("#floatingPhoneNumber").value = user.phoneNumber;
    document.querySelector("#floatingFirstName").value = user.firstName;
    document.querySelector("#floatinglastName").value = user.lastName;
    document.querySelector("#headerProfile").src = user.photo;
}

function getVehiclesOnSelector(selector, data) {
    for (let i = 0; i < vehicles.length; i++) {
        selector.innerHTML += `<option value="${i+1}">${data[i].marca + " " + data[i].modelo + " (" + data[i].matricula + ")"}</option>`
    }
}