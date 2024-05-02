import { getFullDate, getTime } from "./util";

export default function setHourlyForecastData(weather, card, american) {
    const forecastValuesSection = card.querySelector("#forecastValues");
    const hourlyDate = getFullDate(weather.today.date)
    const cardItem = document.createElement("div");

    cardItem.innerHTML = /*html*/ 
    `
        <p data-id="hour"></p>
        <img data-id="weatherIcon" src="" alt="">
        <p data-id="weatherText"></p>
        <p data-id="temp">°</p>
        <p data-id="prec"></p>
        <p data-id="wind"></p>
        <p data-id="humidity"></p>
        <p data-id="feelTemp"></p>
    `

    card.querySelector("*[data-id='hourlyDate']").textContent = hourlyDate;
    forecastValuesSection.textContent = "";

    weather.today.hour.forEach(hour => {
        const formattedHourData = {
            hour: hour.time.slice(11, 16),
            weatherIcon: hour.condition.icon,
            weatherText: hour.condition.text,
            prec: hour.precip_mm,
            wind: `${hour.wind_kph} ${hour.wind_dir}`,
            humidity: `${hour.humidity} %`,
        }

        const newItem = cardItem.cloneNode(true);

        formattedHourData.temp = (american) ? hour.temp_f + "°": hour.temp_c + "°";
        formattedHourData.feelTemp = (american) ? `${hour.feelslike_f}°`:`${hour.feelslike_c}°`;

        for(const [key, value] of Object.entries(formattedHourData)) {
            if(key === "weatherIcon") {
                newItem.querySelector(`*[data-id='${key}']`).src = value;
            }
            newItem.querySelector(`*[data-id='${key}']`).textContent = value;
        }

        forecastValuesSection.append(newItem);

    })
    
}