const params = new URL(window.location).searchParams;
const imageUrl = "https://image.tmdb.org/t/p/w500";
var pageName = "";
var movieCategories = [];

function getSearchParam(field) {
    return params.get(field);
}

var comments = [];

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

function getArgs() {
    let news = getSearchParam("news");
    let video = getSearchParam("video");
    if (news) {
        getNews(news, fillNews);
        pageName = "news-" + news;
        getComments(pageName, fillSugestions);
        configureSendForm();
    } else if (video) {
        getVideo(video, fillVideo);
        pageName = "video-" + video;
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

function fillVideo(data) {
    let info = data;


    document.getElementById(
        "mediaArea"
    ).innerHTML = `<div class="embed-responsive embed-responsive-16by9">
                                <iframe width="560" height="315" src=${info.url} frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                                </iframe>
                            </div>`;

    document.getElementById("title").innerHTML = info.title;
    document.getElementById("text").innerHTML = info.description;
}

function fillNews(data) {
    let info = data;

    document.getElementById(
        "mediaArea"
    ).innerHTML = `<div class="news-image col-12">
                        <img class="embed-responsive embed-responsive-16by9" src=${info.imageUrl}>
                    </div>`;

    document.getElementById("title").innerHTML = `<a target="_blank" href=${info.url}>${formatDate(info.date)} - ${info.title}<\a>`;
    document.getElementById("text").innerHTML = info.content;
}

$(document).ready(function () {
    getArgs();
});
