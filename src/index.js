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
        e.preventDefault();
        try {
            const searchedLocation = new FormData(e.target).get("search")
            weather = await getWeather(searchedLocation);
            sidebar.update(weather)
        }
        catch {
            e.target.querySelector("input").value = "Inavlid Search";
        }
        
    }

    searchbar.addEventListener('submit', e => search(e))

    document.querySelector("#container").append(sidebar.view)
    document.querySelector("#container").append(searchbar)
}

log();

controller();