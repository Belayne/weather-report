import "./forecast.css"
import { createElement } from "../../util";

function makeWeatherCard(data) {
    const view = createElement("div", {class: "weatherCard"});
    const cardHourText = createElement("p", {class: "hour"});
    const cardImg = createElement("img", {class: "icon"});
    const cardText = createElement("p", {class: "text"});
    const cardTemp = createElement("p", {class: "temp"});

    view.append(cardHourText, cardImg, cardText, cardTemp);

    cardHourText.textContent = data.hour;
    cardImg.setAttribute("src", data.icon);
    cardTemp.textContent = data.temp;
    cardText.textContent = data.text;

    return view;
}

export default function makeHourlyForecast() {
    const view = createElement("div", {id: "hourlyForecastDiv"});
    const cardSlider = createElement("div", {id: "cardSlider"});
    const todayLink = createElement("a", {id: "todayLink", class: "active today"});
    const tomorrowLink = createElement("a", {id: "tomorrowLink"});
    const dayLinks = createElement("div", {id: "dayLinks"});
    const switchTempButton = createElement("button", {id: "switchTempBtn"});
    switchTempButton.textContent = "C°";

    let currentData;
    let isAmerican;

    todayLink.textContent = "Today";
    tomorrowLink.textContent = "Tomorrow";

    dayLinks.append(todayLink, tomorrowLink, switchTempButton);

    view.append(dayLinks);

    function setViewData(weatherData, american = true, tomorrow = false) {
        isAmerican = american;
        currentData = weatherData;

        cardSlider.innerHTML = "";
        let hourlyData;

        if(tomorrow) {
            hourlyData = currentData.tomorrow.hour;
            todayLink.classList.remove("active");
            tomorrowLink.classList.add("active");
        }
        else {
            hourlyData = currentData.today.hour.filter(hour => hour.time_epoch >= currentData.now.last_updated_epoch - 3600);
            todayLink.classList.add("active");
            tomorrowLink.classList.remove("active");
        }

        hourlyData.forEach(hourData => {
            const formattedData = {
                hour: hourData.time.slice(11, 16),
                icon: hourData.condition.icon,
                text: hourData.condition.text
            }
            formattedData.temp = (isAmerican) ? hourData.temp_f + "°F": hourData.temp_c + "°C";
            const card = makeWeatherCard(formattedData);
            card.setAttribute("data-hour", formattedData.hour);
            cardSlider.append(card);
        })
        view.append(cardSlider);
    }

    tomorrowLink.addEventListener("click", () => setViewData(currentData, isAmerican, true));

    todayLink.addEventListener("click", () => setViewData(currentData, isAmerican));

    return {
        view,
        setViewData
    }
}