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

export default function makeHourlyForecast(weather, american) {
    const view = createElement("div", {id: "hourlyForecastDiv"});
    const cardSlider = createElement("div", {id: "cardSlider"});
    const todayLink = createElement("a", {id: "todayLink", class: "active today"});
    const tomorrowLink = createElement("a", {id: "tomorrowLink"});
    const dayLinks = createElement("div", {id: "dayLinks"});

    todayLink.textContent = "Today";
    tomorrowLink.textContent = "Tomorrow";

    dayLinks.append(todayLink, tomorrowLink);

    view.append(dayLinks);

    function setViewData(weather, american) {
        cardSlider.innerHTML = "";

        const hourlyData = weather.today.hour.filter(hour => hour.time_epoch >= weather.now.last_updated_epoch - 3600);  //From current hour till 23:00

        hourlyData.forEach(hourData => {
            const formattedData = {
                hour: hourData.time.slice(11, 16),
                icon: hourData.condition.icon,
                text: hourData.condition.text
            }
            formattedData.temp = (american) ? hourData.temp_f + "°F": hourData.temp_c + "°C";
            const card = makeWeatherCard(formattedData);
            card.setAttribute("data-hour", formattedData.hour);
            cardSlider.append(card);
        })
        view.append(cardSlider);
    }

    setViewData(weather, american);

    return {
        view,
        setViewData
    }
}