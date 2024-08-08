import { useContext } from "react";
import WeatherContext from "../../context/WeatherContextProvider";
import Lottie from "lottie-react";
import travelAnimation from "../../../assets/travel-animation.json";

const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const Weather = () => {
  const {
    city,
    temperatureCelsius,
    weatherData,
    weatherCardStyle,
    weatherIcon,
  } = useContext(WeatherContext);

  if (!weatherData) {
    return (
      <div className="w-full max-w-md bg-white flex shadow-lg rounded-lg relative">
        <Lottie
          animationData={travelAnimation}
          height={200}
          width={200}
          loop={true}
          autoplay={true}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>
    );
  }

  return (
    <div
      style={weatherCardStyle}
      className="bg-white shadow-lg rounded-lg w-full max-w-md mx-auto"
    >
      <div id="weather-card" className="flex flex-col">
        <div id="weather-header" className=" text-white p-4 rounded-t-lg mb-4">
          <h1 className="text-xl font-semibold text-center">{city}</h1>
        </div>
        <div id="weather-card-body" className="p-6">
          <div id="weather-details" className="space-y-4">
            <div
              id="weather-date"
              className="weather-data text-lg text-gray-600"
            >
              {formatDate(weatherData.date)}
            </div>
            <div
              id="weather-temperature"
              className="weather-data text-2xl font-semibold"
            >
              {temperatureCelsius}°C
            </div>
            <div
              id="weather-clouds"
              className="weather-data text-lg text-gray-600"
            >
              Clouds: {weatherData.cloud_cover.afternoon}%
            </div>
            <div
              id="weather-rainfall"
              className="weather-data text-lg text-gray-600"
            >
              Rainfall: {weatherData.precipitation.total} mm
            </div>
            <div id="weather-icon" className="weather-data mb-4">
              <img
                src={weatherIcon}
                alt="Weather icon"
                className="w-20 h-20 mx-auto"
              />
            </div>
          </div>
        </div>
        <div
          id="weather-footer"
          className="bg-gray-100 p-4 rounded-b-lg text-center text-sm text-gray-600"
        >
          <p id="weather-footer-text">
            * Temperature, cloud, and rainfall are measured as averages
            throughout the day
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
