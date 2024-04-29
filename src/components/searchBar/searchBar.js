import "./searchBar.css"
import searchIcon from "./search_FILL0_wght400_GRAD0_opsz24.svg"
import { createElement } from "../../util";

export default function makeSearchbarView() {
    const view = createElement("form", {id: "searchbarDiv"});
    const searchLabel = createElement("label", {for: "locationSearch"});
    const searchImg = createElement("img", {src: searchIcon});
    const searchInput = createElement("input", {type: "search", id: "locationSearch", name: "search", placeholder: "Search location here"});

    searchLabel.append(searchImg);
    view.append(searchLabel, searchInput);


    return view;
}