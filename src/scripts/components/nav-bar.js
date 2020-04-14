
import css from "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            ${css}   
        </style>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center">
            <a class="navbar-brand" href="#">Movie Finder</a>
        </nav>
       `;
    }
}

customElements.define("nav-bar", NavBar);