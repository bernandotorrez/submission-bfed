
import css from "bootstrap/dist/css/bootstrap.min.css";

class AuthorFooter extends HTMLElement {

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
        <footer class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center">
            <a class="navbar-brand" href="#">Movie Finder by <strong>Bernand D H</strong> (mail.bernand@gmail.com)</a>
        </footer>
       `;
    }
}

customElements.define("author-footer", AuthorFooter);