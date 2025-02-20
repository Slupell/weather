import React, { useState } from "react";

interface CityInputProps {
  onCitySubmit: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity("");
    onCitySubmit(city);
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
    </form>
  );
};

export default CityInput;
