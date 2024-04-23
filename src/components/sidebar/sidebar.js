import "./sidebar.css";
import {format} from "date-fns";

function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function createDateLocationView(location, lastUpdate) {
    let time = getTime(lastUpdate)
    const date = format(new Date, 'eeee d MMMM');
    const view = document.createElement('div');

    view.classList.add('dateLocationDiv')
    view.innerHTML = /*html*/ `
        <h1 class="sidebarLocation">${location}</h1>
        <p class="sidebarTime">${time}</p>
        <p class="sidebarDate">${date}</p>
    `

    return view;
}

function createWeatherView(weatherData, american = false) {
    const view = document.createElement('div');
    let weatherText = weatherData.condition.text;
    let weatherIcon = weatherData.condition.icon;
    let temp = (american)? weatherData.temp_f + "°F": weatherData.temp_c + "°C";
    let feelTemp = (american)? weatherData.feelslike_f + "°F": weatherData.feelslike_c + "°C";
    
    view.classList.add('sidebarWeather');
    view.innerHTML = /*html*/ `
        <figure class="sidebarWeatherFig">
            <img src="${weatherIcon}"/>
            <figcaption>${weatherText}</figcaption>
        </figure>
        <p class="sidebarTemp">${temp}</p>
        <p class="sidebarPerceived">Perceived ${feelTemp}</p>
    `

    function update(newData) {
        
    }

    return view;
}


export default function makeSidebar(weatherData) {
    const view = document.createElement('div');
    view.id = "sidebarContainer";

    const sidebarDateLocation = createDateLocationView(weatherData.location, weatherData.now.last_updated);
    const sidebarWeather = createWeatherView(weatherData.now);

    view.append(sidebarDateLocation);
    view.append(sidebarWeather);

    return view;
}


