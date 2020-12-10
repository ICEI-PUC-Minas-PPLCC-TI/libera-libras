const params = new URL(window.location).searchParams;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const movieUrl = "https://www.themoviedb.org/movie/";
var movieCategories = [];

function getSearchParam(field) {
    return params.get(field);
}

function getArgs () {
    let news = getSearchParam("news");
    let video = getSearchParam("video");
    if (news) {
        getNews(news, fillInfos);
    } else if (video) {
        getVideo(video, fillInfos);
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

    console.log(movie)
}

$(document).ready(function () {
    getArgs();
});