function replaceSpotlightVideo(data) {
    let video = data[0].video;
    let spotlight = document.getElementById("spotlight");

    spotlight.getElementsByTagName("iframe")[0].src = video.url;
    spotlight.getElementsByClassName("title")[0].innerHTML = video.title;
    spotlight.getElementsByClassName("description")[0].innerHTML = video.description;    
}

function start() {
    getSpotlightVideo("home", replaceSpotlightVideo);
}

$(document).ready(start);
