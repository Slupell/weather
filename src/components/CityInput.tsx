import React, { useState } from "react";
import axios from "axios";
import { CityInputProps } from "../types";

export const CityInput: React.FC<CityInputProps> = ({
  onCitySubmit,
  addedCities,
}) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[А-Яа-я A-Za-z\s]+$/.test(city)) {
      setError("Please enter a valid city name.");
      return;
    }

    if (addedCities.includes(city)) {
      setError("This city has already been added.");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_WEATHERMAP_API_KEY;
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      if (response.data.length === 0) {
        setError("City not found.");
        return;
      }

      onCitySubmit(city);
      setCity("");
      setError(null);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setError("An error occurred while fetching city data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Get Weather
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};
