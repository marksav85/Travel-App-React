import { useContext } from "react";
import WeatherContext from "../../context/WeatherContextProvider";
import Lottie from "lottie-react";
import travelAnimation from "../../../assets/travel-animation.json";
import raindropIcon from "/media/weather-icons/raindrop.svg";
import cloudyIcon from "/media/weather-icons/cloudy.svg";

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
  const { city, temperatureCelsius, weatherData, tempIcon, weatherIcon } =
    useContext(WeatherContext);

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
    <div className="bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <div id="weather-card" className="flex flex-col h-full">
        <div
          id="weather-header"
          className="bg-blue-500 text-white rounded-t-lg flex-shrink-0 
                   p-2 md:p-4 lg:p-6"
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
            {city}
          </h2>
        </div>
        <div className="flex flex-col flex-grow">
          <div
            id="weather-card-body"
            className="flex-1 h-full p-6 text-blue-500 font-semibold"
          >
            <div id="weather-details" className="space-y-4">
              <div className="flex flex-col items-start">
                <div
                  id="weather-date"
                  className="weather-data flex justify-start text-lg md:text-xl lg:text-2x"
                >
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
                    {formatDate(weatherData.date)}
                  </h2>
                </div>
              </div>
              <div>
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    <img src={cloudyIcon} className="w-20 h-20" alt="" />
                  </div>
                  <div
                    id="weather-clouds"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {weatherData.cloud_cover.afternoon}%
                  </div>
                </div>
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    <img src={raindropIcon} className="w-20 h-20" alt="" />
                  </div>
                  <div
                    id="weather-rainfall"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {weatherData.precipitation.total} mm
                  </div>
                </div>
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    <img src={tempIcon} className="w-20 h-20" alt="" />
                  </div>
                  <div
                    id="weather-rainfall"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {temperatureCelsius}°C
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <div
                  id="weather-icon"
                  className="weather-data flex flex-col flex-1 items-center justify-center mb-4"
                >
                  <img
                    src={weatherIcon}
                    alt="Weather icon"
                    className="w-20 h-20 mx-auto"
                  />
                </div>
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
    </div>
  );
};

export default Weather;
