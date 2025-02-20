import React from "react";
import { WeatherDataOptionsProps } from "../types";

const options = [
  { value: "main.temp", label: "Temperature" },
  { value: "main.pressure", label: "Pressure" },
  { value: "main.humidity", label: "Humidity" },
  { value: "wind.speed", label: "Wind Speed" },
  { value: "pop", label: "Probability of Precipitation" },
  { value: "visibility", label: "Visibility" },
];

export const WeatherDataOptions: React.FC<WeatherDataOptionsProps> = ({
  selectedValue,
  onChange,
}) => {
  return (
    <select
      value={selectedValue}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
