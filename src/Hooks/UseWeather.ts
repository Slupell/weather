import { useState } from "react";
import { WeatherData } from "../types";
import { fetchCityCoordinates, fetchWeatherForecast } from "../Api/index";

export const UseWeather = (addedCities: string[]) => {
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
      const { lat, lon } = await fetchCityCoordinates(city);
      const weatherData = await fetchWeatherForecast(lat, lon);

      const newWeatherData: WeatherData = {
        city,
        data: weatherData,
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
