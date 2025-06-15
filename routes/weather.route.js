import { Router } from "express";
import { getOrCreateWeather, getStoredWeather } from "../controllers/weather.controller.js";

const weatherRouter = Router();

weatherRouter.get('/weather', getOrCreateWeather);
weatherRouter.get('/weather/:city', getStoredWeather);

export { weatherRouter };
