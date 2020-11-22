// local
//const apiUrl = "http://localhost:3000/";
// heroku
const apiUrl = "https://libera-libras-api.herokuapp.com/";

function htmlGetRequest(url, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let data = JSON.parse(request.response);
            callback(data);
        }
    };

    request.open("GET", apiUrl + url);
    request.send();
}

function htmlPostRequest(url, body, callback) {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        console.log(request);
        if (
            request.readyState == XMLHttpRequest.DONE &&
            (request.status == 200 || request.status == 201)
        ) {
            let data = JSON.parse(request.response);
            callback(data);
        }
    };
    
    request.open("POST", apiUrl + url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(body);
}

function getCities(callback) {
    let url = "cities";

    htmlGetRequest(url, callback);
}

function getSpotlightVideo(screen, callback) {
    let url = "spotlightVideos?_expand=video&screen=" + screen;

    htmlGetRequest(url, callback);
}

function getPlaylistById(id, callback) {
    let url = "playlists/" + id + "/_embed=videos";

    htmlGetRequest(url, callback);
}

function getSpotlightPlaylist(callback) {
    let url = "playlists?order=0&_embed=videos";

    htmlGetRequest(url, callback);
}

function getSpotlightEvents(callback) {
    let date = new Date().toISOString().slice(0, 16);
    let url =
        "events?spotlight=true&_sort=date&_order=asc&_expand=city&date_gte=" +
        date;

    htmlGetRequest(url, callback);
}

function getEventsByCity(callback, city = 0) {
    let date = new Date().toISOString().slice(0, 16);
    let url = "events?_sort=date&_order=asc&_expand=city&date_gte=" + date;
    if (city != 0) {
        url += "&cityId=" + city;
    }

    htmlGetRequest(url, callback);
}

function getPlaylistByPage(page, pageSize, callback) {
    let url =
        "playlists?order_gte=1&_sort=order&_order=asc&_embed=videos&_page=" +
        page +
        "&_limit=" +
        pageSize;

    htmlGetRequest(url, callback);
}

function getVideosByPlaylist(page, pageSize, playlist, callback) {
    let url =
        "videos?_sort=id&_order=asc&playlistId=" +
        playlist +
        "&_page=" +
        page +
        "&_limit=" +
        pageSize;

    htmlGetRequest(url, callback);
}

function getNewsbyPage(page, pageSize, callback) {
    let url =
        "news?_sort=date&_order=desc&_page=" + page + "&_limit=" + pageSize;

    htmlGetRequest(url, callback);
}

function postEvent (body, callback) {
    let url = "events"

    htmlPostRequest(url, JSON.stringify(body), callback);
}

function postCity (body, callback) {
    let url = "cities";

    htmlPostRequest(url, JSON.stringify(body), callback);
}
