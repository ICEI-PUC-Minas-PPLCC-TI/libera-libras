const params = new URL(window.location).searchParams;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const movieUrl = "https://www.themoviedb.org/movie/";
var pageName = ""
var movieCategories = [];

function getSearchParam(field) {
    return params.get(field);
}


function completeSugestions(data) {
    let newsFeed = document.getElementById("newsFeed");

    let comment = data;

    let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-12">
            <div class="card-body">
            <h5 class="card-title">${comment.name}</h5>
            <p class="card-text">${comment.desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;

    newsFeed.innerHTML += box;
    titleForm.value = "";
    descForm.value = "";
}

function configureSendForm() {
    register.onsubmit = (e) => {
        if (titleForm.value.length == 0 || descForm.value.length == 0) {
            instrucoes.classList.add("erro");
            instrucoes.innerHTML = "Preencha todos os campos";
            console.log("erro");
        } else {
            let info = {
                name: titleForm.value,
                desc: descForm.value,
                screen: pageName,
            };

            instrucoes.innerHTML = "";
            instrucoes.classList.remove("erro");

            postComment(info, completeSugestions);

            newsFeed = document.getElementById("newsFeed");
        }
        e.preventDefault();
    };
}


function getArgs () {
    let news = getSearchParam("news");
    let video = getSearchParam("video");
    if (news) {
        getNews(news, fillInfos);
        pageName = "news-"+news;
        getComments(pageName, fillSugestions); 
        configureSendForm();
    } else if (video) {
        getVideo(video, fillInfos);
        pageName = "video-"+video;
        getComments(pageName, fillSugestions); 
        configureSendForm();
    } else {
        //sem parametros
    }
}

function formatDate(date) {
    return (
        date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4)
    );
}

function fillInfos(data) {
    let info = data;

    console.log(info);
}

let comments = [];

function fillSugestions(data) {
    comments = data;
    let newsFeed = document.getElementById("newsFeed");

    comments.forEach((comment) => {
        let box = `<div class="card mb-3 col-12">
            <div class="row no-gutters">
            <div class="col-12">
            <div class="card-body">
            <h5 class="card-title">${comment.name}</h5>
            <p class="card-text">${comment.desc}
            </p>
            </div>
            </div>
            </div>
        </div>`;

        newsFeed.innerHTML += box;
    });
}


$(document).ready(function () {
    getArgs();
});