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
