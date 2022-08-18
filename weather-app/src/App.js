import React from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import getFormattedWeatherData  from "./services/WeatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UilReact } from "@iconscout/react-unicons";

export default function App() {
    const [query, setQuery] = React.useState({ q: "Paris" });
    const [units, setUnits] = React.useState("metric");
    const [weather, setWeather] = React.useState(null);
    let weatherBackgroundColor = {};

    React.useEffect(() => {
        const fetchWeather = async () => {
        const message = query.q ? query.q : "current location.";

        toast.info("Fetching weather for " + message);

        await getFormattedWeatherData({ ...query, units }).then((data) => {
            toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
            );
            
            setWeather(data);
        });
        };

        fetchWeather();
    }, [query, units]);

    if (weather) {
        if (weather.id.includes("d")) {
            if (weather.details.includes("Thunderstorm") || weather.details.includes("Clouds") || weather.details.includes("Snow") || weather.details.includes("Sleet") || weather.details.includes("Rain") || weather.details.includes("Drizzle") || weather.id.includes("7")) {
                weatherBackgroundColor = {
                    backgroundColor: "#6c8083"
                };
            } else {
                weatherBackgroundColor = {
                    backgroundColor: "#3d808a"
                };
            }
        } else if (weather.id.includes("n")) {
            weatherBackgroundColor = {
                backgroundColor: "#065673"
            };
        }
        console.log(weather.details);
    }

    return (
        <>
            <div className="react-weather-app">
                <UilReact className="react-weather-app--icon" />
                <div className="react-weather-app--texts">
                    <h1 className="react-weather-app--title">React Weather App</h1>
                    <p>by Dorian Cottin</p>
                </div>
            </div>
            <div className="weather--background" style={weatherBackgroundColor}>
                <Header setQuery={setQuery} />
                { weather && <Weather weather={weather} /> }
            </div>
        </>
    );
};