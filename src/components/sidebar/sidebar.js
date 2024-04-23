import "./sidebar.css";
import {format} from "date-fns";

function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function createDateLocationView(location, lastUpdate) {
    const formattedData = {};
    const view = document.createElement('div');
    view.classList.add('dateLocationDiv')

    function init(location, lastUpdate) {
        formattedData.location = location;
        formattedData.date = format(new Date, 'eeee d MMMM');
        formattedData.time = getTime(lastUpdate);

        view.innerHTML = /*html*/ `
        <h1 class="sidebarLocation">${formattedData.location.city}<span> ${formattedData.location.country}</span></h1>
        <p class="sidebarTime">${formattedData.time}</p>
        <p class="sidebarDate">${formattedData.date}</p>
    `
    }

    init(location, lastUpdate);

    return {
        view,
        init
    }
}

function createWeatherView(weatherData, american = false) {
    const view = document.createElement('div');
    view.classList.add('sidebarWeather');
    const formattedData = {};

    function init(weatherData) {
        formattedData.weatherText = weatherData.condition.text;
        formattedData.weatherIcon = `${weatherData.condition.icon}`;
        formattedData.temp = (american)? weatherData.temp_f + "°F": weatherData.temp_c + "°C";
        formattedData.feelTemp = (american)? "Perceived " + weatherData.feelslike_f + "°F": "Perceived " + weatherData.feelslike_c + "°C";

        view.innerHTML = /*html*/ `
        <figure class="sidebarWeatherFig">
            <img src="${formattedData.weatherIcon}"/>
            <figcaption>${formattedData.weatherText}</figcaption>
        </figure>
        <p class="sidebarTemp">${formattedData.temp}</p>
        <p class="sidebarPerceived">${formattedData.feelTemp}</p>
    `
    }

    init(weatherData);

    return {
        view,
        init
    }
}


export default function makeSidebar(weatherData) {
    const view = document.createElement('div');
    view.id = "sidebarContainer";

    const sidebarDateLocation = createDateLocationView(weatherData.location, weatherData.now.last_updated);
    const sidebarWeather = createWeatherView(weatherData.now);

    view.append(sidebarDateLocation.view);
    view.append(sidebarWeather.view);

    function update(newData) {
        sidebarWeather.init(newData.now);
        sidebarDateLocation.init(newData.location, newData.now.last_updated)
    }

    return {
        view,
        update
    }
}


