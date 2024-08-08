import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const sunIcon = "/media/weather-icons/sun.svg";
const cloudSunIcon = "/media/weather-icons/cloud_sun.svg";
const cloudIcon = "/media/weather-icons/cloud.svg";
const lightRainIcon = "/media/weather-icons/light_rain.svg";
const snowflakeIcon = "/media/weather-icons/snowflake.svg";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [temperatureCelsius, setTemperatureCelsius] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherCardStyle, setWeatherCardStyle] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://my-weather-travel-app-2714255072bb.herokuapp.com"
      : "http://localhost:8000";

  useEffect(() => {
    if ((city && date, submitted)) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/weather?city=${city}&date=${date}`
          );
          const data = await response.json();

          // Log the raw weather data
          console.log("WeatherProvider: ", data);

          // Extract the temperature data
          const temperatureMin = data.temperature.min; // min temp
          const temperatureMax = data.temperature.max; // max temp
          // Calculate the average temperature
          const averageTemperature = (temperatureMin + temperatureMax) / 2;
          // Convert the temperature to Celsius
          const temperatureCelsius = Math.round(averageTemperature - 273.15);
          setTemperatureCelsius(temperatureCelsius);

          // Log the converted temperature in Celsius
          console.log(
            "WeatherProvider: Temperature in Celsius:",
            temperatureCelsius
          );

          let icon = "";
          let style = {};

          if (temperatureCelsius >= 30) {
            style = {
              background: "linear-gradient(to bottom right, #FF5733, #FD9728)",
            };
            icon = sunIcon;
          } else if (temperatureCelsius >= 20) {
            style = {
              background: "linear-gradient(to bottom right, #F0AE05, #FFD700)",
            };
            icon = cloudSunIcon;
          } else if (temperatureCelsius >= 10) {
            style = {
              background: "linear-gradient(to bottom right, #FFD700, #4CAF50)",
            };
            icon = cloudIcon;
          } else if (temperatureCelsius >= 0) {
            style = {
              background: "linear-gradient(to bottom right, #4CAF50, #3498DB)",
            };
            icon = lightRainIcon;
          } else {
            style = {
              background: "linear-gradient(to bottom right, #3498DB, #4B595E)",
            };
            icon = snowflakeIcon;
          }

          // Log the selected icon and style
          console.log("WeatherProvider: Selected icon:", icon);
          console.log("WeatherProvider: Card style:", style);

          setWeatherData(data);
          setWeatherCardStyle(style);
          setWeatherIcon(icon);
          setErrorMessage("");
        } catch (error) {
          console.error("WeatherProvider: Error fetching weather data:", error);
          setErrorMessage("Location not found");
        }
      };

      fetchWeatherData();
      setSubmitted(false); // Reset submitted state after fetching weather data
    }
  }, [city, date, submitted, baseUrl]);

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `${baseUrl}/user-location?lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) throw new Error("Error fetching city name");
            const data = await response.json();
            console.log("City from coordinates:", data.city);
            setCity(data.city);
            console.log("City Name:", city);
          } catch (error) {
            console.error("Error:", error.message);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to reset all states
  const resetAll = () => {
    setCity("");
    setDate("");
    setTemperatureCelsius(null);
    setWeatherData(null);
    setErrorMessage("");
    setWeatherCardStyle({});
    setWeatherIcon("");
    setSubmitted(false);
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
        weatherCardStyle,
        weatherIcon,
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
