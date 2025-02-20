import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeatherChartProps {
  data: WeatherData[];
  dataKey: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data, dataKey }) => {
  const chartData = data.flatMap((weatherData) =>
    weatherData.data.map((item) => ({
      ...item,
      city: weatherData.city,
    }))
  );
  const uniqueTimes = Array.from(new Set(chartData.map((item) => item.dt_txt)));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="dt_txt"
          type="category"
          allowDuplicatedCategory={false}
          ticks={uniqueTimes}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((weatherData) => (
          <Line
            key={weatherData.city}
            type="monotone"
            dataKey={dataKey}
            data={weatherData.data}
            name={weatherData.city}
            stroke={`#${(((1 << 24) * Math.random()) | 0).toString(16)}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
