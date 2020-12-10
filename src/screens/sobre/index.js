function newsFeedBox(title, desc) {
    this.name = title;
    this.desc = desc;
}

let suggestions = [];

function fillSugestions(data) {
    suggestions = data;
    let newsFeed = document.getElementById("newsFeed");
    
    suggestions.forEach(suggestion => {
        
        let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-12">
            <div class="card-body">
            <h5 class="card-title">${suggestion.name}</h5>
            <p class="card-text">${suggestion.desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;
        
        newsFeed.innerHTML += box;
    });
}

function completeSugestions (data) {
    let newsFeed = document.getElementById("newsFeed");

    let suggestion = data;

    let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-12">
            <div class="card-body">
            <h5 class="card-title">${suggestion.name}</h5>
            <p class="card-text">${suggestion.desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;

    newsFeed.innerHTML += box;
        titleForm.value = "";
        descForm.value = "";
        
}


window.onload = () => {

    getSuggestions(fillSugestions);

    register.onsubmit = (e) => {

        if (titleForm.value.length == 0 ||
            descForm.value.length == 0) {

            instrucoes.classList.add("erro");
            instrucoes.innerHTML = "Preencha todos os campos";
            console.log("erro");
        } else {

            let info = new newsFeedBox(titleForm.value, descForm.value);

            suggestions[suggestions.length] = info;
            instrucoes.innerHTML = "";
            instrucoes.classList.remove("erro");

            postSuggestions(info, completeSugestions);

            newsFeed = document.getElementById('newsFeed');
            
        
        }
        e.preventDefault();
    }
}