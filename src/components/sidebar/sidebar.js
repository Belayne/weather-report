import "./sidebar.css";
import {format} from "date-fns";

export default function makeSidebar(weatherData) {
    const view = document.createElement('div');
    view.id = "sidebarContainer";

    const sidebarDateLocation = new DateLocation(weatherData);
    view.appendChild(sidebarDateLocation.view)
    

    return view;
}

class DateLocation {
    constructor(data) {
        this.time = format(data.date, 'HH:MM');
        this.date = format(data.date, 'eeee d MMMM');
        this.location = data.location;

        this.view = document.createElement('div');
        this.view.classList.add('dateLocationDiv')

        this.view.innerHTML = /*html*/ `
            <h1 class="sidebarLocation">${this.location}</h1>
            <p class="sidebarTime">${this.time}</p>
            <p class="sidebarDate">${this.date}</p>
        `
    }

    update(newData) {
        this.date = format(newData.date, 'HH:MM');
        this.time = format(newData.date, 'eeee d MMMM');
        this.location = newData.location;
    }
}