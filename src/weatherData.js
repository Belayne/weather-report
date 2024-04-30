
const KEY = "9937608cefdf496bb1a75912241704";

class Weather {
    constructor(data) {
        this.location = {
            city: data.location.name,
            region: data.location.region,
            country: data.location.country
        }
        this.now = data.current;
        [this.today, this.tomorrow, this.afterTomorrow] = data.forecast.forecastday;
        this.date = new Date();
    }
}

async function getWeather(city = "Rome") {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=3`, {mode: "cors"})
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            const weather = new Weather(data);
            return weather;
        }
        else {
            console.log(response)
            throw new Error(response.statusText)
        }
    }
    catch (error) {
        console.log(error)
    }
}

//const myWeather = new Weather(getWeatherData())

export {
    getWeather
}