import '../components/movie-list.js';
import '../components/search-bar.js';
import '../components/movie-menu.js';

const main = () => {
    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");
    const movieMenuElement = document.querySelector("movie-menu");

    const api_key = 'bd73463666208eb2ab9681ca1337b828';
    const movieUrl = 'https://api.themoviedb.org/3';

    const getNowPlayingMovies = async () => {
        try {
            movieListElement.loading();
            const response = await fetch(`${movieUrl}/movie/now_playing?api_key=${api_key}`);
            const result = await response.json();
            const data_movie = result.results;
            if(data_movie.length == 0) {
                fallbackResult("No Data")
            } else {
                renderResult(data_movie);
            }
        } catch(message) {
            fallbackResult(message)
        }
    };

    const getPopularMovies = async () => {
        try {
            movieListElement.loading();
            const response = await fetch(`${movieUrl}/movie/popular?api_key=${api_key}`);
            const result = await response.json();
            const data_movie = result.results;
            if(data_movie.length == 0) {
                fallbackResult("No Data")
            } else {
                renderResult(data_movie);
            }
        } catch(message) {
            fallbackResult(message)
        }
    };

    const getTopRatedMovies = async () => {
        try {
            movieListElement.loading();
            const response = await fetch(`${movieUrl}/movie/top_rated?api_key=${api_key}`);
            const result = await response.json();
            const data_movie = result.results;
            if(data_movie.length == 0) {
                fallbackResult("No Data")
            } else {
                renderResult(data_movie);
            }
        } catch(message) {
            fallbackResult(message)
        }
    };

    const getUpcomingMovies = async () => {
        try {
            movieListElement.loading();
            const response = await fetch(`${movieUrl}/movie/upcoming?api_key=${api_key}`);
            const result = await response.json();
            const data_movie = result.results;
            if(data_movie.length == 0) {
                fallbackResult("No Data")
            } else {
                renderResult(data_movie);
            }
        } catch(message) {
            fallbackResult(message)
        }
    };

    const searchMovies = async () => {
        try {
            movieListElement.loading();
            const response = await fetch(`${movieUrl}/search/movie/?api_key=${api_key}&query=${searchElement.value}`);
            const result = await response.json();
            const data_movie = result.results;
            if(data_movie.length == 0) {
                fallbackResult("No Data")
            } else {
                renderResult(data_movie);
            }
        } catch(message) {
            fallbackResult(message)
        }
    };

    const renderResult =  results => {
        movieListElement.movies = results;
    };

    const fallbackResult = message => {
        movieListElement.renderError(message);
    };

    searchElement.clickEvent = searchMovies;

    movieMenuElement.clickEventNowPlayingMovie = getNowPlayingMovies;
    movieMenuElement.clickEventPopularMovie = getPopularMovies;
    movieMenuElement.clickEventTopRatedMovie = getTopRatedMovies;
    movieMenuElement.clickEventUpcomingMovie = getUpcomingMovies;

    document.addEventListener('DOMContentLoaded', () => {
        getNowPlayingMovies();
    })
};

export default main;