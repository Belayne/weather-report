import "./sidebar.css";
import {format} from "date-fns";
import { createElement } from "../../util";

function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function createDateLocationView() {
    const formattedData = {};
    const view = createElement('div', {class: "dateLocationDiv"});
    const sidebarLocation = createElement('h1', {class: "sidebarLocation"});
    const sidebarTime = createElement('p', {class: "sidebarTime"});
    const sidebarDate = createElement('p', {class: "sidebarDate"});
    const sidebarCountry = createElement('span');
    const sidebarUpdate = createElement('span');

    sidebarUpdate.textContent = "Last updated";

    view.append(sidebarDate, sidebarLocation, sidebarTime);

    function setViewData(location, lastUpdate) {
        formattedData.location = location;
        formattedData.date = format(new Date, 'eeee d MMMM');
        formattedData.time = getTime(lastUpdate);

        sidebarLocation.textContent = formattedData.location.city + ", " + formattedData.location.region;
        sidebarCountry.textContent = formattedData.location.country;
        sidebarLocation.appendChild(sidebarCountry);

        sidebarTime.textContent = formattedData.time;
        sidebarTime.appendChild(sidebarUpdate);

        sidebarDate.textContent = formattedData.date;

    }

    return {
        view,
        setViewData
    }
}

function createWeatherView() {
    const view = createElement('div', {class: "sidebarWeather"});
    const weatherFigure = createElement('figure', {class: "sidebarWeatherFig"});
    const weatherImg = createElement('img');
    const weatherCaption = createElement('figcaption');
    const tempText = createElement('p', {class: "sidebarTemp"});
    const perceivedText = createElement('p', {class: "sidebarPerceived"});
    const formattedData = {};

    weatherFigure.append(weatherImg, weatherCaption);

    view.append(weatherFigure, tempText, perceivedText);

    function setViewData(weatherData, american = "false") {
        formattedData.weatherText = weatherData.condition.text;
        formattedData.weatherIcon = weatherData.condition.icon;
        formattedData.temp = (american)? weatherData.temp_f + "°F": weatherData.temp_c + "°C";
        formattedData.feelTemp = (american)? "Perceived " + weatherData.feelslike_f + "°F": "Perceived " + weatherData.feelslike_c + "°C";

        weatherImg.setAttribute("src", formattedData.weatherIcon);
        weatherCaption.textContent = formattedData.weatherText;
        tempText.textContent = formattedData.temp;
        perceivedText.textContent = formattedData.feelTemp;
    }

    return {
        view,
        setViewData
    }
}


export default function makeSidebar() {
    const view = document.createElement('div');
    view.id = "sidebarContainer";

    const sidebarDateLocation = createDateLocationView();
    const sidebarWeather = createWeatherView();

    view.append(sidebarDateLocation.view);
    view.append(sidebarWeather.view);

    function setViewData(newData, american) {
        sidebarWeather.setViewData(newData.now, american);
        sidebarDateLocation.setViewData(newData.location, newData.now.last_updated)
    }

    return {
        view,
        setViewData
    }
}


