function newsFeedBox(title, desc) {
    this.title = title;
    this.desc = desc;
}

let vagas = [];


//Garantir que hajam vagas ficticias postadas 

if (localStorage.getItem('Vagas') === null) {
    localStorage.setItem('Vagas', `[{"title":"Lucas Magalhaes","desc":"Otima interface!"},{"title":"Luca Fonseca","desc":"Muito boa ideia! Sofro muito por ser mudo e ninguem saber conversar por libras."},{"title":"Luisa Alcantra","desc":"Muito boa ideia, o estudo de libras deveria ser uma materia na escola!"}]`);
} else {
    console.log("local storage preenchido");
}

vagas = JSON.parse(localStorage.getItem("Vagas"));

window.onload = () => {

    for (x = vagas.length - 1; x >= 0; x--) {
        let newsFeed = document.getElementById('newsFeed');

        let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${vagas[x].title}</h5>
            <p class="card-text">${vagas[x].desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;

        newsFeed.innerHTML += box;
    }

    register.onsubmit = (e) => {

        if (titleForm.value.length == 0 ||
            descForm.value.length == 0) {

            instrucoes.classList.add("erro");
            instrucoes.innerHTML = "Prença todos os campos";
            console.log("erro");
        } else {

            let info = new newsFeedBox(titleForm.value, descForm.value,);

            vagas[vagas.length] = info;
            instrucoes.innerHTML = "";
            instrucoes.classList.remove("erro");

            localStorage.setItem('Vagas', JSON.stringify(vagas));

            newsFeed = document.getElementById('newsFeed');

            box = `<div class="card mb-3 col-12">
                                <div class="row no-gutters">
                                    <div class="col-md-8">
                                    <div class="card-body">
                                            <h5 class="card-title">${vagas[vagas.length - 1].title}</h5>
                                            <p class="card-text">${vagas[vagas.length - 1].desc}
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