import { useState } from "react";
import axios from "axios";
import { WeatherData } from "../types";

export const useWeather = (addedCities: string[]) => {
  const apiKey = import.meta.env.VITE_WEATHERMAP_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_WEATHER_URL;

  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    if (addedCities.includes(city)) {
      setError("This city has already been added.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geocodeResponse = await axios.get(`${baseUrl}/geo/1.0/direct`, {
        params: { q: city, limit: 1, appid: apiKey },
      });

      if (!geocodeResponse.data.length) {
        setError("City not found.");
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];

      const weatherResponse = await axios.get(`${baseUrl}/data/2.5/forecast`, {
        params: { lat, lon, appid: apiKey, units: "metric" },
      });

      const newWeatherData: WeatherData = {
        city,
        data: weatherResponse.data.list,
      };

      setWeatherDataList((prev) => [...prev, newWeatherData]);
    } catch (err) {
      setError((err as Error).message);
      console.error("Ошибка при получении данных о погоде:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (city: string) => {
    setWeatherDataList((prev) => prev.filter((data) => data.city !== city));
  };

  return { weatherDataList, fetchWeatherData, removeCity, loading, error };
};
