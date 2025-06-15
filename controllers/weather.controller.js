import axios from "axios";
import { Weather } from "../modules/weather.module.js";

const API_KEY = process.env.WEATHER_API_KEY;

export const getOrCreateWeather = async (req, res) => {
    const city = req.query.city?.toLowerCase();
    if (!city) return res.status(400).json({ err: "City is required" });

    try {
        let weather = await Weather.findOne({ city });
        if (weather) return res.json(weather);

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        console.log("WEATHER_API_KEY:", API_KEY);

        const data = response.data;

        const newWeather = new Weather({
            city,
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description, 
        });

        await newWeather.save();
        res.json(newWeather);
    } catch (err) {
         console.error("Error in getOrCreateWeather:", err.message || err);
        res.status(500).json({ err: "Failed to fetch or save weather data" });
    }
};

export const getStoredWeather = async (req, res) => {
    const city = req.params.city.toLowerCase();
    try {
        const weather = await Weather.findOne({ city });
        if (!weather) {
            return res.status(404).json({ err: "City not found in database" });
        }
        res.json(weather);
    } catch (err) {
        res.status(500).json({ err: "Error getting weather data" });
    }
};
