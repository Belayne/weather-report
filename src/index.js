import { getWeather } from "./weatherData"
import setCurrentWeatherCardData from "./currentWeather";
import setHourlyForecastData from "./hourlyForecast";
import "./style.css"

async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}

async function Controller() {
    let weather = await getWeather("Rome");
    let fahr = false;
    const searchbar = document.querySelector("#searchbar");
    const currentWeatherCard = document.querySelector("#currentWeatherCard");
    const hourlyForecastCard = document.querySelector("#hourlyForecastCard");
    const fahrBtn = document.querySelector("#fahrBtn");
    const celsBtn = document.querySelector("#celsBtn");

    function updateViewData() {
        setCurrentWeatherCardData(weather, currentWeatherCard, fahr);
        setHourlyForecastData(weather, hourlyForecastCard, fahr);
    }

    async function search(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const searchedLocation = new FormData(form).get("search")
            const newWeather = await getWeather(searchedLocation);
            updateViewData();
            if(!newWeather) {
                throw new Error("Invalid Search")
            }
            else {
                weather = newWeather;
            }
        }
        catch {
            //e.target.querySelector("input").value = "Inavlid Search";
            form.querySelector("input").setCustomValidity("Invalid")
            form.querySelector("input").reportValidity();

            setTimeout(() => {
                form.querySelector("input").setCustomValidity("")
                form.querySelector("input").reportValidity();
            }, 2000)
        }
    }

    function switchTemp(e) {
        fahr = !fahr;
        if(fahr) {
            fahrBtn.classList.add("active");
            celsBtn.classList.remove("active");
            document.querySelectorAll(".tempUnit").forEach(unit => unit.textContent = "°F")
        }
        else {
            fahrBtn.classList.remove("active");
            celsBtn.classList.add("active");
            document.querySelectorAll(".tempUnit").forEach(unit => unit.textContent = "°C")
        }
        updateViewData();
    }

    searchbar.addEventListener('submit', e => search(e))
    fahrBtn.addEventListener("click", e => switchTemp(e));
    celsBtn.addEventListener("click", e => switchTemp(e));
    updateViewData();
}

log();

Controller();
