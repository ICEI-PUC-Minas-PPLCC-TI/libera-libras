function newsFeedBox(title, desc) {
    this.title = title;
    this.desc = desc;
}

let suggestions = [];

function fillSugestions(data) {
    suggestions = data;

    for (x = suggestions.length - 1; x >= 0; x--) {
        let newsFeed = document.getElementById("newsFeed");

        let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${suggestions[x].title}</h5>
            <p class="card-text">${suggestions[x].desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;

        newsFeed.innerHTML += box;
    }
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

            localStorage.setItem('suggestions', JSON.stringify(suggestions));

            newsFeed = document.getElementById('newsFeed');

            box = `<div class="card mb-3 col-12">
                                <div class="row no-gutters">
                                    <div class="col-md-8">
                                    <div class="card-body">
                                            <h5 class="card-title">${suggestions[suggestions.length - 1].title}</h5>
                                            <p class="card-text">${suggestions[suggestions.length - 1].desc}
                                            </p>
                                            </div>
                                </div>
                            </div>`;

            newsFeed.innerHTML += box;

            titleForm.value = "";
            descForm.value = "";

        }
        e.preventDefault();
    }
}