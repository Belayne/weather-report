import "./forecast.css"

function makeWeatherCard(data) {
    const view = document.createElement("div");
    view.classList.add("weatherCard");

    view.innerHTML = /*html*/ `
        <p class="hour">${data.hour}</p>
        <img class="icon" src="${data.icon}" alt = "${data.text}"/>
        <p class="text">${data.text}</p>
        <p class="temp">${data.temp}</p>
    `

    return view;
}

export default function makeHourlyForecast(weather, american) {
    const view = document.createElement("div");
    view.id = "hourlyForecastDiv";
    const cardSlider = document.createElement("div");
    cardSlider.id = "cardSlider";
    const todayLink = document.createElement("a");

    function init(weather, american) {
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

    init(weather, american);

    return {
        view,
        init
    }
}