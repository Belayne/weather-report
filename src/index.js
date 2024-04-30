import { getWeather } from "./weatherData"
import makeSidebar from "./components/sidebar/sidebar";
import makeSearchbarView from "./components/searchBar/searchBar";
import makeHourlyForecast from "./components/hourlyForecast/forecast";
import "./style.css"

async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}

async function Controller() {
    let weather = await getWeather("Rome");
    let american = false;
    const sidebar = makeSidebar();
    const searchbar = makeSearchbarView();
    const hourlyForecast = makeHourlyForecast();
    
    sidebar.setViewData(weather, american);
    hourlyForecast.setViewData(weather, american);

    function updateView() {
        sidebar.setViewData(weather, american);
        hourlyForecast.setViewData(weather, american);
    }

    function switchTemp(e) {
        american = !american;
        sidebar.setViewData(weather, american);
        hourlyForecast.setViewData(weather, american);
        e.target.textContent = (american)? "°F": "°C";
    }

    async function search(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const searchedLocation = new FormData(form).get("search")
            weather = await getWeather(searchedLocation);
            updateView();
        }
        catch {
            //e.target.querySelector("input").value = "Inavlid Search";
            form.querySelector("input").setCustomValidity("Location not found")
            form.querySelector("input").reportValidity();
        }
    }

    searchbar.addEventListener('submit', e => search(e))
    hourlyForecast.view.querySelector("#switchTempBtn").addEventListener("click", e => switchTemp(e));

    //Resets input validity on new search
    searchbar.querySelector("input").addEventListener("change",e => {
        e.target.setCustomValidity("");
    })

    function render() {
        document.querySelector("#sidebar").append(sidebar.view)
        document.querySelector("#mainContent").append(searchbar)
        document.querySelector("#mainContent").append(hourlyForecast.view)
    }

    render();
}

log();

Controller();