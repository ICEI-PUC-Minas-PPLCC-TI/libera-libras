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

/*Cometários js*/
function leDados( ) {
    let strDados = localStorage.getItem('dc');
     let objDados = {};
    if(strDados) {
       objDados = JSON.parse(strDados);
    }
   else {
       objDados = {Comentário:[
                         {Nome: "Joana Silva", Comentário:"legal"},
                         {Nome: "Diana Vilela", Comentário:"gostei"}
                        ] }
   }
    return objDados;
}

function salvaDados (dados) {
   localStorage.setItem('dc',JSON.stringify (dados));
}

function incluirComentarios (){
   //Ler os dados do localStorage
   let objDados = leDados();

   //Incluir um novo contato
   let strNome = document.getElementById('campoNome').value;
   let strComentario = document.getElementById('cMsg').value;
   let novoComentario = {
       Nome: strNome,
       Comentário: strComentario
   };
   objDados.Comentário.push (novoComentario);

   //Salvar os dados no localStorage novamente 
    salvaDados (objDados);

    //Atualiza os dados  da tela 
    imprimeDados();
}
 

function imprimeDados (dados) {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();
    for (i=0; i< objDados.Comentário.length; i++) {
        strHtml += `<p>${objDados.Comentário[i].Nome}: ${objDados.Comentário[i].Comentário}</p>`
    }
    tela.innerHTML = strHtml;
}
//configura os botões
document.getElementById('btnCarregaDados').addEventListener('click',imprimeDados);
document.getElementById('btnIncluirComentarios').addEventListener('click',incluirComentarios);