import { getDate, getTime } from "./util"

export default function setCurrentWeatherCardData(weatherData, card, american) {
    const formattedData = createFormattedData(weatherData, american);

    for(const [key, value] of Object.entries(formattedData)) {
        if(key === "icon") {
            card.querySelector(`*[data-id='${key}']`).src = value;
        }
        card.querySelector(`*[data-id='${key}']`).textContent = value;
    }

}

function createFormattedData(weatherData, american) {
    const formattedData = {
        lastUpdate: getTime(weatherData.now.last_updated),
        currentDate: getDate(weatherData.now.last_updated),
        city: weatherData.location.city + ", " + weatherData.location.region,
        country: weatherData.location.country,
        icon: weatherData.now.condition.icon,
        weather: weatherData.now.condition.text,
        wind: weatherData.now.wind_kph + " Km/h " + weatherData.now.wind_dir,
        humidity: weatherData.now.humidity + "%",
        uvIndex: weatherData.now.uv,
        visibility: weatherData.now.vis_km + "Km"
    }

    formattedData.temp = (american) ? weatherData.now.temp_f + "°F": weatherData.now.temp_c + "°C";
    formattedData.feelTemp = (american) ? `Feels like ${weatherData.now.feelslike_f}°`:`Feels like ${weatherData.now.feelslike_c}°`;

    return formattedData;
}