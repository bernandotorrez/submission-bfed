import css from "bootstrap/dist/css/bootstrap.min.css";

class MovieMenu extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    set clickEventNowPlayingMovie(event) {
        this._clickEventNowPlayingMovie = event;
        this.render();
    }

    set clickEventPopularMovie(event) {
        this._clickEventPopularMovie = event;
        this.render();
    }

    set clickEventTopRatedMovie(event) {
        this._clickEventTopRatedMovie = event;
        this.render();
    }

    set clickEventUpcomingMovie(event) {
        this._clickEventUpcomingMovie = event;
        this.render();
    }

    get valueNowPlaying() {
        return this.shadowDOM.querySelector("#now_playing");
    }

    get valuePopularMovie() {
        return this.shadowDOM.querySelector("#popular_movie");
    }

    get valueTopRatedMovie() {
        return this.shadowDOM.querySelector("#top_rated");
    }

    get valueUpcomingMovie() {
        return this.shadowDOM.querySelector("#upcoming");
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            ${css} 
        </style>
        <p>
        
            <nav class="nav nav-pills flex-column flex-sm-row">
                <a class="flex-sm-fill text-sm-center nav-link active" id="now_playing" value="now_playing" href="#">Now Playing</a>
                <a class="flex-sm-fill text-sm-center nav-link" id="popular_movie" value="popular" href="#">Popular</a>
                <a class="flex-sm-fill text-sm-center nav-link" id="top_rated" value="top_rated" href="#">Top Rated</a>
                <a class="flex-sm-fill text-sm-center nav-link" id="upcoming" value="upcoming" href="#">Upcoming</a>
            </nav>
        
        </p>
        `;
        
        this.shadowDOM.querySelector("#now_playing").addEventListener("click", this._clickEventNowPlayingMovie);
        this.shadowDOM.querySelector("#popular_movie").addEventListener("click", this._clickEventPopularMovie);
        this.shadowDOM.querySelector("#top_rated").addEventListener("click", this._clickEventTopRatedMovie);
        this.shadowDOM.querySelector("#upcoming").addEventListener("click", this._clickEventUpcomingMovie);

    }
}

customElements.define("movie-menu", MovieMenu);