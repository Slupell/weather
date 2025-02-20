import React, { useState } from "react";
import axios from "axios";
import { CityInput } from "./components/CityInput";
import { WeatherChart } from "./components/WeatherChart";
import { WeatherData } from "./types";

const apiKey = import.meta.env.VITE_WEATHERMAP_API_KEY;

const App: React.FC = () => {
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
  const [dataKey, setDataKey] = useState<string>("main.temp");

  const fetchWeatherData = async (city: string) => {
    try {
      const geocodeResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const { lat, lon } = geocodeResponse.data[0];
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const newWeatherData: WeatherData = {
        city,
        data: weatherResponse.data.list,
      };
      setWeatherDataList((prev) => [...prev, newWeatherData]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeCity = (city: string) => {
    setWeatherDataList((prev) => prev.filter((data) => data.city !== city));
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex flex-col space-y-4">
        <CityInput
          onCitySubmit={fetchWeatherData}
          addedCities={weatherDataList.map((data) => data.city)}
        />
        <select
          onChange={(e) => setDataKey(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="main.temp">Temperature</option>
          <option value="main.pressure">Pressure</option>
          <option value="main.humidity">Humidity</option>
          <option value="wind.speed">Wind Speed</option>
          <option value="pop">Probability of Precipitation</option>
          <option value="visibility">Visibility</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto mt-4">
        {weatherDataList.map((weatherData) => (
          <div key={weatherData.city} className="flex items-center mb-2">
            <span className="mr-2">{weatherData.city}</span>
            <button
              onClick={() => removeCity(weatherData.city)}
              className="p-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex-1">
        {weatherDataList.length > 0 && (
          <WeatherChart data={weatherDataList} dataKey={dataKey} />
        )}
      </div>
    </div>
  );
};

export default App;
