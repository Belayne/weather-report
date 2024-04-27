import "./searchBar.css"
import searchIcon from "./search_FILL0_wght400_GRAD0_opsz24.svg"

export default function makeSearchbarView() {
    const view = document.createElement("form");
    view.id = "searchbarDiv";

    function search() {}

    view.innerHTML = /*html*/ `
    <label for="locationSearch"><img src=${searchIcon}></label>
    <input type="search" id="locationSearch" name="search" placeholder="Search location here">
    `

    return view;
}