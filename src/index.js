import { getWeather } from "./weatherData"
import setCurrentWeatherCardData from "./currentWeather";
import "./style.css"

async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}

async function Controller() {
    let weather = await getWeather("Rome");
    let american = false;
    const searchbar = document.querySelector("#searchbar");
    const currentWeatherCard = document.querySelector("#currentWeatherCard");

    setCurrentWeatherCardData(weather, currentWeatherCard);

    async function search(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const searchedLocation = new FormData(form).get("search")
            weather = await getWeather(searchedLocation);
            setCurrentWeatherCardData(weather, currentWeatherCard);
            if(!weather) {
                throw new Error("Invalid Search")
            }
        }
        catch {
            //e.target.querySelector("input").value = "Inavlid Search";
            form.querySelector("input").setCustomValidity("Location not found")
            form.querySelector("input").reportValidity();

            setTimeout(() => {
                form.querySelector("input").setCustomValidity("")
                form.querySelector("input").reportValidity();
            }, 2000)
        }
    }

    searchbar.addEventListener('submit', e => search(e))
}

log();

Controller();