export interface WeatherData {
  city: string;
  data: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    visibility: number;
    pop: number;
  }[];
}

export interface CityInputProps {
  onCitySubmit: (city: string) => void;
  addedCities: string[];
}
export interface WeatherChartProps {
  data: WeatherData[];
  dataKey: string;
}

export interface WeatherDataOptionsProps {
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
