var playlistPage = 1;
var playlistPageSize = 2;
var videoPageSize = 2;

function updateSpotlightVideo(data) {
    let video = data[0].video;
    let spotlight = document.getElementById("spotlight");

    spotlight.getElementsByTagName("iframe")[0].src = video.url;
    spotlight.getElementsByClassName("title")[0].innerHTML = video.title;
    spotlight.getElementsByClassName("description")[0].innerHTML =
        video.description;
}

function clearPlaylistVideos(playlist) {
    let playlistDiv = document.getElementById("playlist-" + playlist);

    let videoDivs = playlistDiv.getElementsByClassName("video-box");

    for (let i = 0; i < videoDivs.length; i++) {
        if (i == 0) {
            videoDivs[i].id = "";
            videoDivs[i].getElementsByTagName("iframe")[0].src = "";
            videoDivs[i].getElementsByClassName("title")[0].innerHTML = "";
            videoDivs[i].getElementsByClassName("description")[0].innerHTML =
                "";
        } else {
            videoDivs[i].remove();
        }
    }
}

function updatePlaylistVideos(data) {
    if (data.length) {
        let playlistDiv = document
            .getElementById("playlist-" + data[0].playlistId)
            .getElementsByClassName("videos-row")[0];
        let videoDiv = playlistDiv.getElementsByClassName("video-box")[0];

        data.forEach((video) => {
            let thisVideoDiv;

            if (videoDiv.id) {
                thisVideoDiv = videoDiv.cloneNode(true);
                playlistDiv.appendChild(thisVideoDiv);
            } else {
                thisVideoDiv = videoDiv;
            }

            thisVideoDiv.id = "video-" + video.id;
            thisVideoDiv.getElementsByTagName("iframe")[0].src = video.url;
            thisVideoDiv.getElementsByClassName("title")[0].innerHTML =
                video.title;
            thisVideoDiv.getElementsByClassName("description")[0].innerHTML =
                video.description;
        });
    }
}

function loadMoreVideos(page, playlist) {
    let playlistDiv = document.getElementById("playlist-" + playlist);

    getVideosByPlaylist(page, videoPageSize, playlist, updatePlaylistVideos);

    playlistDiv.getElementsByClassName(
        "btn-load-more"
    )[0].onclick = function () {
        loadMoreVideos(page + 1, playlist);
    };
}

function updatePlaylists(data) {
    let videosDiv = document.getElementsByClassName("videos")[0];
    let videosSection = document.getElementsByClassName("videos-section")[0];
    data.forEach((playlist) => {
        let thisVideosDiv;

        if (videosDiv.id) {
            thisVideosDiv = videosDiv.cloneNode(true);
            videosSection.appendChild(thisVideosDiv);
        } else {
            thisVideosDiv = videosDiv;
        }

        thisVideosDiv.id = "playlist-" + playlist.id;
        thisVideosDiv.getElementsByClassName("title")[0].innerHTML =
            playlist.name;

        clearPlaylistVideos(playlist.id);

        getVideosByPlaylist(
            1,
            videoPageSize,
            playlist.id,
            updatePlaylistVideos
        );

        thisVideosDiv.getElementsByClassName(
            "btn-load-more"
        )[0].onclick = function () {
            loadMoreVideos(2, playlist.id);
        };
    });
}

function start() {
    getSpotlightVideo("home", updateSpotlightVideo);
    getPlaylistByPage(playlistPage, playlistPageSize, updatePlaylists);
    playlistPage++;
}

function endPage() {
    getPlaylistByPage(playlistPage, playlistPageSize, updatePlaylists);
    playlistPage++;
}

$(document).ready(start);

$(window).scroll(function () {
    if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 100
    ) {
        endPage();
    }
});
