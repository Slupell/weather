import { apiKey, baseUrl } from "../Constants";
import axios from "axios";

export const fetchCityCoordinates = async (city: string) => {
  const response = await axios.get(`${baseUrl}/geo/1.0/direct`, {
    params: { q: city, limit: 1, appid: apiKey },
  });

  if (!response.data.length) {
    throw new Error("City not found.");
  }

  return response.data[0];
};

export const fetchWeatherForecast = async (lat: number, lon: number) => {
  const response = await axios.get(`${baseUrl}/data/2.5/forecast`, {
    params: { lat, lon, appid: apiKey, units: "metric" },
  });

  return response.data.list;
};
