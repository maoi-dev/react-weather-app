import React from "react";
import { UilAngleUp, UilAngleDown, UilTemperatureHalf, UilWind, UilArrowDown, UilRaindropsAlt } from "@iconscout/react-unicons";

export default function Weather({weather: data}) {

    return (
        <main>
            <h2 className="weather--city">{data.name}</h2>
            <h3 className="weather--country">{data.country}</h3>
            <h2 className="weather--main_temperature">{data.temp.toFixed()}</h2>
            <div className="weather--image_container">
                <img className="weather--image" src={require(`../images/${data.id}.svg`)} alt="Weather" />
            </div>
            <div className="weather--temperatures_container">
                <div className="weather--temperatures">
                    <UilAngleDown />
                    <p className="weather--texts">{data.temp_min.toFixed()}</p>
                </div>
                <div className="weather--temperatures">
                    <UilAngleUp />
                    <p className="weather--texts">{data.temp_max.toFixed()}</p>
                </div>
            </div>
            <div className="weather--informations_container">
                <div className="weather--informations">
                    <UilTemperatureHalf className="weather--informations_icon"/>
                    <div className="weather--informations_text">
                        <p className="weather--texts">Feel like</p>
                        <p>{data.feels_like.toFixed()}</p>
                    </div>
                </div>
                <div className="weather--informations">
                    <UilWind className="weather--informations_icon"/>
                    <div className="weather--informations_text">
                        <p className="weather--texts">Wind</p>
                        <p>{data.speed.toFixed()} km/h</p>
                    </div>
                </div>
                <div className="weather--informations">
                    <UilArrowDown className="weather--informations_icon"/>
                    <div className="weather--informations_text">
                        <p className="weather--texts">Pressure</p>
                        <p>{data.pressure} hPa</p>
                    </div>
                </div>
                <div className="weather--informations">
                    <UilRaindropsAlt className="weather--informations_icon"/>
                    <div className="weather--informations_text">
                        <p className="weather--texts">Humidity</p>
                        <p>{data.humidity}%</p>
                    </div>
                </div>
            </div>
        </main>
    );
};