import { createContext, useState } from "react";
import PropTypes from "prop-types";
import useWeatherData from "../hooks/useWeatherData";
import useCurrentLocation from "../hooks/useCurrentLocation";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://my-weather-travel-app-2714255072bb.herokuapp.com"
      : "http://localhost:8000";

  const {
    weatherData,
    temperatureCelsius,
    tempIcon,
    weatherIcon,
    errorMessage,
    resetWeatherData,
  } = useWeatherData(city, date, submitted, baseUrl);

  const { handleUseCurrentLocation } = useCurrentLocation(baseUrl, setCity);

  const resetAll = () => {
    setCity("");
    setDate("");
    // setTemperatureCelsius(null);
    // setWeatherData(null);
    // setErrorMessage("");
    // setWeatherIcon("");
    setSubmitted(false);
    resetWeatherData();

    console.log("Data reset");
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        date,
        setCity,
        setDate,
        temperatureCelsius,
        weatherData,
        errorMessage,
        weatherIcon,
        tempIcon,
        handleUseCurrentLocation,
        setSubmitted,
        resetAll,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WeatherContext;
