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
        thisNewsDiv.getElementsByClassName("content")[0].innerHTML =
            news.content;
        thisNewsDiv.getElementsByClassName("link")[0].href = news.url;
        thisNewsDiv.getElementsByTagName("img")[0].src = news.imageUrl;
    });
}

function start() {
    getSpotlightVideo("news", updateSpotlight);
    getNewsbyPage(1, newsPageSize, updateNews)
}

$(document).ready(start);