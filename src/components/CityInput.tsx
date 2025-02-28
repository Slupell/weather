import React, { useState } from "react";

import { CityInputProps } from "../types";

export const CityInput: React.FC<CityInputProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[А-Яа-яA-Za-z\s]{3,}$/.test(city)) {
      setError("Please enter a valid city name.");
      return;
    }

    onCitySubmit(city);
    setCity("");
    setError(null);
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
