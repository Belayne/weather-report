import { getWeather } from "./weatherData"
import setCurrentWeatherCardData from "./currentWeather";
import setThreeDayCardData from "./threeDay";
import { startThrobber, endThrobber } from "./util";
import getIp from "./geoLocation";
import setHourlyForecastData from "./hourlyForecast";
import "./style.css";


/*async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}*/

async function Controller() {
    let weather;
    let fahr = false;
    const searchbar = document.querySelector("#searchbar");
    const currentWeatherCard = document.querySelector("#currentWeatherCard");
    const hourlyForecastCard = document.querySelector("#hourlyForecastCard");
    const threeDayCard = document.querySelector("#threeDayCard");
    const fahrBtn = document.querySelector("#fahrBtn");
    const celsBtn = document.querySelector("#celsBtn");
    let clientIP;

    function updateViewData() {
        setCurrentWeatherCardData(weather, currentWeatherCard, fahr);
        setHourlyForecastData(weather, hourlyForecastCard, fahr);
        setThreeDayCardData(weather, threeDayCard, fahr);
    }

    async function search(e) {
        e.preventDefault();
        const form = e.target;
        try {
            startThrobber(currentWeatherCard, hourlyForecastCard,threeDayCard)
            const searchedLocation = new FormData(form).get("search")
            const newWeather = await getWeather(searchedLocation);
            if(!newWeather) {
                throw new Error("Invalid Search")
            }
            else {
                weather = newWeather;
                updateViewData();
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
        finally {
            endThrobber(currentWeatherCard, hourlyForecastCard, threeDayCard);
        }
    }

    function switchTemp(e) {
        const clicked = e.target.id;
        fahr = (clicked === "celsBtn")? false: true;
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

    startThrobber(currentWeatherCard, hourlyForecastCard, threeDayCard);
    clientIP = await getIp();
    weather = await getWeather(clientIP);    
    searchbar.addEventListener('submit', e => search(e))
    fahrBtn.addEventListener("click", e => switchTemp(e));
    celsBtn.addEventListener("click", e => switchTemp(e));
    updateViewData();
    endThrobber(currentWeatherCard, hourlyForecastCard, threeDayCard);
}

//log();

Controller();
