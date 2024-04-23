import "./searchBar.css"

export default function makeSearchbarView() {
    const view = document.createElement("div");
    view.id = "searchbarDiv";

    function search() {}

    view.innerHTML = /*html*/ `
    <label for="locationSearch">Icon</label>
    <input type="search" id="locationSearch" placeholder="Search location here">
    `

    return view;
}