import "./forecast.css"

function makeWeatherCard(data) {
    const view = document.createElement("div");
    view.classList.add("weatherCard");

    view.innerHTML = /*html*/ `
        <p class="hour">${data.hour}</p>
        <img class="cardIcon" src="${data.icon}" alt = "${data.text}"/>
        <p class="cardTemp">${data.temp}</p>
    `

    return view;
}

export default function makeHourlyForecast(hourlyData, american) {
    const view = document.createElement("div");
    view.id = "hourlyForecastDiv";
    const cardSlider = document.createElement("div");
    cardSlider.id = "cardSlider";

    function init(hourlyData, american) {
        cardSlider.innerHTML = "";

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

    init(hourlyData, american);

    return {
        view,
        init
    }
}