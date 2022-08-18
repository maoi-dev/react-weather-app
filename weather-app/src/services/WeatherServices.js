import { DateTime } from "luxon";

const API_KEY = "1a313d84b342a85979b41505c26848a4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    let {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    let { main: details, icon, id } = weather[0];

    if (name.includes("Arrondissement de ")) {
        name = name.replace("Arrondissement de ", "");
    } else if (name.includes("Arrondissement d'")) {
        name = name.replace("Arrondissement d'", "");
    }

    if (id >= 200 && id <= 202 && id >= 231 && id <= 232) {
        id = 200;
    } else if (id >= 210 && id <= 230) {
        id = 210;
    } else if (id >= 300 && id <= 321) {
        id = 300;
    } else if (id >= 500 && id <= 511) {
        id = 500;
    } else if (id >= 520 && id <= 531) {
        id = 520;
    } else if (id >= 600 && id <= 602) {
        id = 600;
    } else if (id >= 611 && id <= 622) {
        id = 611;
    } else if (id >= 701 && id <= 731) {
        id = 711;
    } else if (id >= 751 && id <= 771) {
        id = 741;
    } else if (id === 802) {
        id = 801;
    } else if (id === 804) {
        id = 803;
    }

    function getTimestampInSeconds() {
        return Math.floor(Date.now() / 1000);
    }

    var nowTimestamp = getTimestampInSeconds();

    if (nowTimestamp >= sunrise && nowTimestamp <= sunset) {
        id = `${id}d`;
    } else {
        id = `${id}n`;
    }

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        id,
        speed,
    }
};

// const formatForecastWeather = (data) => {
//     let { timezone, daily, hourly } = data;
//     daily = daily.slice(1, 6).map((d) => {
//         return {
//         title: formatToLocalTime(d.dt, timezone, "ccc"),
//         temp: d.temp.day,
//         icon: d.weather[0].icon,
//         };
//     });

//     hourly = hourly.slice(1, 6).map((d) => {
//         return {
//         title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
//         temp: d.temp,
//         icon: d.weather[0].icon,
//         };
//     });

//     return { timezone, daily, hourly };
// };

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    // const formattedForecastWeather = await getWeatherData("onecall", {
    //     lat,
    //     lon,
    //     exclude: "current,minutely,alerts",
    //     units: searchParams.units,
    // }).then(formatForecastWeather);

    return { ...formattedCurrentWeather };
    // return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// const iconUrlFromCode = (code) =>
//     `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime };