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
/*Cometários js*/
function leDados( ) {
    let strDados = localStorage.getItem('db');
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
   localStorage.setItem('db',JSON.stringify (dados));
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
        strHtml += `<p>${objDados.Comentário[i].Nome}-${objDados.Comentário[i].Comentário}</p>`
    }
    tela.innerHTML = strHtml;
}
//configura os botões
document.getElementById('btnCarregaDados').addEventListener('click',imprimeDados);
document.getElementById('btnIncluirComentarios').addEventListener('click',incluirComentarios);