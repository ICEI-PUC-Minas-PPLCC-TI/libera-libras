var playlistPageSize = 3;
var newsPageSize = 3;
var videoPageSize = 2;

function updateSpotlight(data) {
    let video = data[0].video;
    let spotlight = document.getElementById("spotlight");

    spotlight.getElementsByTagName("iframe")[0].src = video.url;
    spotlight.getElementsByClassName("title")[0].innerHTML = video.title;
    spotlight.getElementsByClassName("content")[0].innerHTML =
        video.description;
}

function formatDate(date) {
    date = date.split("-");
    return date[2] + "/" + date[1] + "/" + date[0];
}

function updateNews(data) {
    let newsContainer = document.getElementsByClassName("news-container")[0];
    let newsItem = newsContainer.getElementsByClassName("news-item")[0];

    data.forEach((news) => {
        let thisNewsDiv;

        if (newsItem.id) {
            thisNewsDiv = newsItem.cloneNode(true);
            newsContainer.appendChild(thisNewsDiv);
        } else {
            thisNewsDiv = newsItem;
        }

        thisNewsDiv.id = "news-" + news.id;
        thisNewsDiv.getElementsByClassName("date")[0].innerHTML = formatDate(
            news.date
        );
        thisNewsDiv.getElementsByClassName("title")[0].innerHTML = news.title;
        thisNewsDiv.getElementsByClassName("internalLink")[0].href = "../info/?news="+news.id;
        thisNewsDiv.getElementsByClassName("content")[0].innerHTML =
            news.content;
        thisNewsDiv.getElementsByClassName("link")[0].href = news.url;
        thisNewsDiv.getElementsByTagName("img")[0].src = news.imageUrl;
    });
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

function configureSendForm () {
    register.onsubmit = (e) => {
        if (titleForm.value.length == 0 || descForm.value.length == 0) {
            instrucoes.classList.add("erro");
            instrucoes.innerHTML = "Preencha todos os campos";
            console.log("erro");
        } else {
            let info = {name: titleForm.value, desc: descForm.value, screen: "news"};

            instrucoes.innerHTML = "";
            instrucoes.classList.remove("erro");

            postComment(info, completeSugestions);

            newsFeed = document.getElementById("newsFeed");
        }
        e.preventDefault();
    };
}

function start() {
    getSpotlightVideo("news", updateSpotlight);
    getNewsbyPage(1, newsPageSize, updateNews);
    getComments("news", fillSugestions); 
    configureSendForm();
}

$(document).ready(start);