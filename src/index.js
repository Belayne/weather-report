import { getWeather } from "./weatherData"
import makeSidebar from "./components/sidebar/sidebar";
import makeSearchbarView from "./components/searchBar/searchBar";

async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}

async function controller() {
    let weather = await getWeather("Rome");
    const sidebar = makeSidebar(weather);
    const searchbar = makeSearchbarView();

    async function search(e) {
        const searchedLocation = e.target.value;
        console.log(searchedLocation)
        weather = await getWeather(searchedLocation);
        sidebar.update(weather)
    }

    searchbar.addEventListener('search', e => search(e))

    document.querySelector("#container").append(sidebar.view)
    document.querySelector("#container").append(searchbar)
}

log();

controller();