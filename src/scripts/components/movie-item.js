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

    render() {
        let release_date = this._movie.release_date.split("-").reverse().join("-");
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
                        <p class="card-text">
                            ${star_rating}
                        </p>
                        <p class="card-text badge badge-primary">
                            Release Date : ${release_date}
                        </p>
                        <p class="card-text">
                            ${this._movie.overview.substring(0, 200)} ...
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