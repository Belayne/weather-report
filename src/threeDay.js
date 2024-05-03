import { getWeekDate } from "./util";

const CARD_TEMPLATE = document.createElement('div');
CARD_TEMPLATE.classList.add('dayCard');

CARD_TEMPLATE.innerHTML = /*html*/`
    <h3 data-id="date"></h3>
    <img data-id="icon" src="" alt="">
    <div>
        <p data-id="maxTemp"></p>
        <p data-id="minTemp"></p>
    </div>`
    

export default function setThreeDayCardData(weather, card, fahr) {
    const forecast = [weather.today, weather.tomorrow, weather.afterTomorrow];
    const threeDaySecion = card.querySelector("#threeDaySection");
    const cardItem = document.createElement("div");

    threeDaySecion.textContent = "";

    forecast.forEach(dayWeather => {
        const formattedWeatherData = {
            date: getWeekDate(dayWeather.date),
            icon: dayWeather.day.condition.icon,
        }
        formattedWeatherData.maxTemp = (fahr) ? dayWeather.day.maxtemp_f + "°": dayWeather.day.maxtemp_c + "°";
        formattedWeatherData.minTemp = (fahr) ? dayWeather.day.mintemp_f + "°": dayWeather.day.mintemp_c + "°";

        const newItem = CARD_TEMPLATE.cloneNode(true);

        for(const [key, value] of Object.entries(formattedWeatherData)) {
            if(key === "icon") {
                newItem.querySelector(`*[data-id='${key}']`).src = value;
            }
            newItem.querySelector(`*[data-id='${key}']`).textContent = value;
        }

        threeDaySecion.append(newItem);

    })
}