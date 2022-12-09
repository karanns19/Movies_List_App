/* 

API Routes

Discover 
https://api.themoviedb.org/3/discover/movie?sort_by=opularity.desc&api_key=

Search 
https://api.themoviedb.org/3/search/movie?api_key=""&query=""

*/

'use strict';

const API_URL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a548bbc49aa8619f2f66ffc709447d50';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
    'https://api.themoviedb.org/3/search/movie?api_key=a548bbc49aa8619f2f66ffc709447d50';


const main = document.getElementById('main');
const form = document.getElementById('search_form');
const search = document.getElementById('search');
const logo = document.querySelector('.logo');

// Get initial Movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length === 0) {
        main.innerHTML = '';

        const createErrorEL = document.createElement('div');
        createErrorEL.classList.add('errorHandle');

        createErrorEL.innerHTML = `<h1>Oh no 🙅🏻 ! There is no such movie exists </h1>`;

        main.appendChild(createErrorEL);
    } else {
        showMovies(data.results);
    }
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const createEL = document.createElement('div');
        createEL.classList.add('movie');

        createEL.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="movie image" class="movie-img" />
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getOverviewRating(
            vote_average
        )}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3 class="overview">
              ${overview}
            </h3>
          </div>
      `;

        main.appendChild(createEL);
    });
}

function getOverviewRating(rating) {
    if (rating >= 8) {
        return 'green';
    } else if (rating >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// When we/user submitting the movie name in search bar for the addEventListener(The addEventListener() method attaches an event handler to a document.) added that text of search to our path.

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});

// To go back to that previous page which we are previewing from sorting the famous movies. writing addEventListener for load same page.

logo.addEventListener('click', () => {
    main.innerHTML = '';
    getMovies(API_URL);
});



