import "./searchBar.css"

export default function makeSearchbarView() {
    const view = document.createElement("form");
    view.id = "searchbarDiv";

    function search() {}

    view.innerHTML = /*html*/ `
    <label for="locationSearch">Icon</label>
    <input type="search" id="locationSearch" name="search" placeholder="Search location here">
    `

    return view;
}