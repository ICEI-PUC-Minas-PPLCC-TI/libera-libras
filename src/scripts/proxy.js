const apiUrl = "http://localhost:3000";

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
    let url = "/spotlightVideos?_expand=video&screen=" + screen; 
    
    htmlGetRequest(url, callback);
}
