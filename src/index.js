import { getWeather } from "./weatherData"
import makeSidebar from "./components/sidebar/sidebar";

async function log() {
    const weather = await getWeather("Rome");
    console.log(weather)
}

async function controller() {
    const weather = await getWeather("Rome");
    const sidebar = makeSidebar(weather);

    document.querySelector("#container").append(sidebar)
}

log();

controller();