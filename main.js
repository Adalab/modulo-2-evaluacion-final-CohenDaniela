'use strict'

///contantes de elementos html
const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const container = document.querySelector('.js-container');
const asideFav = document.querySelector('.js-favorites');

///const para guardar en LS
const seriesLS = JSON.parse(localStorage.getItem('fav'));




///arrays vacios (listas de series)
let serieList = [];
let favorites = [];

///Petición al servidor
function getSerie(event) {

    event.preventDefault()
    const nameSerie = input.value
    ///constante url API
    const url = `//api.tvmaze.com/search/shows?q=${nameSerie}`
    fetch(url)
        .then((response) => response.json())
        .then((dataAPI) => {
            console.log(dataAPI);
            ///poner datos en Array
            serieList = dataAPI;
            ///llamar funcion para que la pinte
            renderSerie(serieList)



        });

}

///pintar una sola serie con etiquetas html


function serieOne(serie) {
    let html = '';



    if (favorites.findIndex(item => item.show.id === serie.show.id) !== -1) {
        html += `<article id=${serie.show.id} class="js-serie-one serie-one favorite">`
    }

    else { html += `<article id=${serie.show.id} class="js-serie-one serie-one">` }
    console.log(favorites.findIndex(item => item.show.id === serie.show.id) !== -1)
    html += `<h2>${serie.show.name}</h2>`

    // html += `<span> Idioma original: ${serie.show.language}</span>`

    //si tiene imagen
    if (serie.show.image) { html += `<img class="img" src= "${serie.show.image.medium}"></img>` }
    ///si no tiene imagen
    else {
        html += `<img  src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></img>`
    }

    html += `</article>`
    return html;



}

///pintar lista de series
function renderSerie(serieList) {
    container.innerHTML = '';
    for (const serie of serieList) {
        container.innerHTML += serieOne(serie) ///aqui llamo a funcion que pinta una sola serie

    }
    ///llamo a funcion que añade a favoritos a traves de evento
    addEventstoSeries()
}
///pintar lista de favorites
function renderSeriefav(favorites) {
    asideFav.innerHTML = '';
    for (const serie of favorites) {
        asideFav.innerHTML += serieOne(serie) ///aqui llamo a funcion que pinta una sola serie

    }
    ///llamo a funcion que añade a favoritos a traves de evento
    addEventstoSeries()

}

function handleclick(event) {


    const idSerieClicked = event.currentTarget.id;


    let foundSerie = serieList.find(serie => serie.show.id == idSerieClicked);

    const indexFav = favorites.findIndex(serie => serie.show.id == idSerieClicked);


    if (indexFav === -1) {
        favorites.push(foundSerie);




    }
    else {
        favorites.splice(indexFav, 1);

    }


    console.log(favorites);
    ///llamo a funcion que pinta favorites
    renderSeriefav(favorites)
    renderSerie(serieList)

    localStorage.setItem('fav', JSON.stringify(favorites));

}

if (seriesLS !== null) {
    favorites = seriesLS
    renderSeriefav(favorites);
}

else {
    addEventstoSeries()




};



console.log(favorites)
///funcion pintar favoritas




function addEventstoSeries() {
    const article = document.querySelectorAll('.js-serie-one')
    for (const item of article) {
        item.addEventListener('click', handleclick)





    }
}

// function localStorage(){
//     localStorage.setItem('fav', JSON.stringify(favorites));
//     const seriesLS = JSON.parse(localStorage.getItem('fav'));
//     if (seriesLS !== null) {
//         favorites = seriesLS
//         renderSerie(favorites);
//     }

//     else {
//         addEventstoSeries()

//     };

//     }

///evento sobre el boton search
btn.addEventListener('click', getSerie);