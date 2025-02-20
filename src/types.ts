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
