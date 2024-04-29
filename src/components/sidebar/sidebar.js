import "./sidebar.css";
import {format} from "date-fns";
import { createElement } from "../../util";

function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function createDateLocationView(location, lastUpdate) {
    const formattedData = {};
    const view = createElement('div', {class: "dateLocationDiv"});
    const sidebarLocation = createElement('h1', {class: "sidebarLocation"});
    const sidebarTime = createElement('p', {class: "sidebarTime"});
    const sidebarDate = createElement('p', {class: "sidebarDate"});
    const sidebarCountry = createElement('span');
    const sidebarUpdate = createElement('span');

    sidebarUpdate.textContent = "Last updated";

    view.append(sidebarLocation, sidebarTime, sidebarDate);

    function init(location, lastUpdate) {
        formattedData.location = location;
        formattedData.date = format(new Date, 'eeee d MMMM');
        formattedData.time = getTime(lastUpdate);

        sidebarLocation.textContent = formattedData.location.city;
        sidebarCountry.textContent = formattedData.location.country;
        sidebarLocation.appendChild(sidebarCountry);

        sidebarTime.textContent = formattedData.time;
        sidebarTime.appendChild(sidebarUpdate);

        sidebarDate.textContent = formattedData.date;

    }

    init(location, lastUpdate);

    return {
        view,
        init
    }
}

function createWeatherView(weatherData, american) {
    const view = createElement('div', {class: "sidebarWeather"});
    const weatherFigure = createElement('figure', {class: "sidebarWeatherFig"});
    const weatherImg = createElement('img');
    const weatherCaption = createElement('figcaption');
    const tempText = createElement('p', {class: "sidebarTemp"});
    const perceivedText = createElement('p', {class: "sidebarPerceived"});
    const formattedData = {};

    weatherFigure.append(weatherImg, weatherCaption);

    view.append(weatherFigure, tempText, perceivedText);

    function init(weatherData) {
        formattedData.weatherText = weatherData.condition.text;
        formattedData.weatherIcon = `${weatherData.condition.icon}`;
        formattedData.temp = (american)? weatherData.temp_f + "°F": weatherData.temp_c + "°C";
        formattedData.feelTemp = (american)? "Perceived " + weatherData.feelslike_f + "°F": "Perceived " + weatherData.feelslike_c + "°C";

        weatherImg.setAttribute("src", formattedData.weatherIcon);
        weatherCaption.textContent = formattedData.weatherText;
        tempText.textContent = formattedData.temp;
        perceivedText.textContent = formattedData.perceivedText;
    }

    init(weatherData);

    return {
        view,
        init
    }
}


export default function makeSidebar(weatherData, american) {
    const view = document.createElement('div');
    view.id = "sidebarContainer";

    const sidebarDateLocation = createDateLocationView(weatherData.location, weatherData.now.last_updated);
    const sidebarWeather = createWeatherView(weatherData.now, american);

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


