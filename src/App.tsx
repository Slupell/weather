import React, { useState } from "react";
import { CityInput } from "./components/CityInput";
import { WeatherChart } from "./components/WeatherChart";
import { useWeather } from "./Hooks/UseWeather";
import { WeatherDataOptions } from "./components/WeatherDataOptions";

const App: React.FC = () => {
  const [addedCities, setAddedCities] = useState<string[]>([]);
  const { weatherDataList, fetchWeatherData, removeCity, loading, error } =
    useWeather(addedCities);
  const [dataKey, setDataKey] = useState<string>("main.temp");
  const handleCitySubmit = (city: string) => {
    setAddedCities((prev) => [...prev, city]);
    fetchWeatherData(city);
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>

      <div className="flex flex-col space-y-4">
        <CityInput onCitySubmit={handleCitySubmit} addedCities={addedCities} />

        <WeatherDataOptions
          selectedValue={dataKey}
          onChange={(e) => setDataKey(e.target.value)}
        />
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
