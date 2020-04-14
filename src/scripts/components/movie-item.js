import css from "bootstrap/dist/css/bootstrap.min.css";

class MovieItem extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
        this.imgPath = 'http://image.tmdb.org/t/p/w500';
    }

    set movie(movie) {
        this._movie = movie;
        this.render();
    }

    async genre(param) {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=bd73463666208eb2ab9681ca1337b828&language=en-US');
        let data = await response.json();
        let data_genre = [];

        param.forEach(id => {
            data.genres.forEach(movie => {
                if(id == movie.id) {
                    data_genre.push(movie.name);
                }
            })
        })
        
        return data_genre;
    }

    async render() {
        let poster = (this._movie.poster_path ? `${this.imgPath}/${this._movie.poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPS91SXO_J_XCdlf8rbrOLyoh3HEAFyrCVzg8co1tuFf_Yb3e1&usqp=CAU');
        
        let vote = this._movie.vote_average.toFixed();

        let max_vote = 10;
        let remain_vote = max_vote - vote;

        let star_rating = '';
        for (var rating_filled = 0; rating_filled < vote; rating_filled++) {
            star_rating += ' <span class="rating-filled">&#9733;</span>';
        }

        for (var rating_empty = 0; rating_empty < remain_vote; rating_empty++) {
            star_rating += ' <span class="rating-filled">&#9734;</span>';
        }

        let data_genre = await this.genre(this._movie.genre_ids);
        let genre = '';
        data_genre.forEach(genre_name => {
            genre += `<span class="badge badge-success">${genre_name}</span> `;
        })


        this.shadowDOM.innerHTML = `
           <style>
              ${css}

              .card-title {
                  font-weight: bold;
                  text-align: center;
              }

              .movie-card {
                max-width: 600px; 
                display: block; 
              }

              .justify {
                text-align: justify; 
                text-justify: inter-word;
              }

              .rating-empty {
                font-size: 25px;
                color: black;
              }

              .rating-filled {
                font-size: 25px;
                color: #007bff;
                width: 50;
              }
           </style>
           <center><div class="card mb-3 movie-card">
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src="${poster}" class="card-img" alt="${this._movie.title}">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this._movie.title}</h5>
                        <p class="card-text text-left">
                            ${star_rating}
                        </p>
                        <p class="card-text text-left">
                            ${genre}
                        </p>
                        <p class="card-text text-left">
                            <span class="badge badge-primary"> Release Date : ${this._movie.release_date.split("-").reverse().join("-")}</span>
                        </p>
                        <p class="card-text justify" style="font-size: 14px">
                            ${this._movie.overview.substring(0, 180)} ...
                        </p>
                        
                    </div>
                    </div>
                </div>
            </div>
            </center>       
           `;
    }
}

customElements.define("movie-item", MovieItem);