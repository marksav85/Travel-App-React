import { useState, useEffect } from "react";

// Import weather icons
import sunIcon from "/media/weather-icons/sun.svg";
import overcastIcon from "/media/weather-icons/overcast.svg";
import rainIcon from "/media/weather-icons/rain.svg";
import partCloudIcon from "/media/weather-icons/partly-cloudy-day.svg";
import partRainIcon from "/media/weather-icons/partly-cloudy-day-rain.svg";
import partSnowIcon from "/media/weather-icons/partly-cloudy-day-snow.svg";

// Import temperature icons
import hotIcon from "/media/weather-icons/thermometers/thermometer-hot.svg";
import warmIcon from "/media/weather-icons/thermometers/thermometer-warm.svg";
import mildIcon from "/media/weather-icons/thermometers/thermometer-mild.svg";
import coldIcon from "/media/weather-icons/thermometers/thermometer-cold.svg";
import freezingIcon from "/media/weather-icons/thermometers/thermometer-freezing.svg";

// Function to determine the appropriate weather icon
const getWeatherIcon = (cloudCover, rainfall, temperatureCelsius) => {
  // Overcast conditions
  if (cloudCover > 70 && rainfall <= 0.1) return overcastIcon;
  // Partly cloudy with minimal rainfall
  if (cloudCover > 20 && rainfall <= 0.1) return partCloudIcon;
  // Partly cloudy with rain, above freezing
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius >= 0)
    return partRainIcon;
  // Partly cloudy with snow, below freezing
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius < 0)
    return partSnowIcon;
  // Rainy conditions
  if (rainfall >= 0.5) return rainIcon;
  // Default sunny icon
  return sunIcon;
};

// Function to determine the appropriate temperature icon
const getTempIcon = (temperatureCelsius) => {
  // Hot temperature
  if (temperatureCelsius >= 30) return hotIcon;
  // Warm temperature
  if (temperatureCelsius >= 20) return warmIcon;
  // Moderate temperature
  if (temperatureCelsius >= 10) return mildIcon;
  // Cold temperature
  if (temperatureCelsius >= 0) return coldIcon;
  // Freezing temperature
  return freezingIcon;
};

// Custom hook to fetch and manage weather data
const useWeatherData = (city, date, submitted, baseUrl) => {
  // State variables
  const [temperatureCelsius, setTemperatureCelsius] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [tempIcon, setTempIcon] = useState("");

  useEffect(() => {
    // Only fetch weather data if city, date, and submitted flag are present
    if (city && date && submitted) {
      const fetchWeatherData = async () => {
        try {
          // Fetch weather data from the API
          const response = await fetch(
            `${baseUrl}/weather?city=${city}&date=${date}`
          );
          // Check if the response is ok
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          console.log("Weather data:", data);

          // Calculate average temperature in Celsius
          const temperatureMin = data.temperature.min;
          const temperatureMax = data.temperature.max;
          const averageTemperature = (temperatureMin + temperatureMax) / 2;
          const temperatureCelsius = Math.round(averageTemperature - 273.15);
          setTemperatureCelsius(temperatureCelsius);

          // Determine the temperature icon
          const tempIcon = getTempIcon(temperatureCelsius);

          // Extract weather data for icons
          const cloudCover = data.cloud_cover.afternoon;
          const rainfall = data.precipitation.total;

          // Determine the weather icon based on conditions
          const weatherIcon = getWeatherIcon(
            cloudCover,
            rainfall,
            temperatureCelsius
          );

          // Update state with fetched data and icons
          setWeatherData(data);
          setWeatherIcon(weatherIcon);
          setTempIcon(tempIcon);
          setErrorMessage("");
        } catch (error) {
          // Handle any errors that occur during fetching
          setErrorMessage("Location not found");
        }
      };

      fetchWeatherData();
    }
  }, [city, date, submitted, baseUrl]);

  const resetWeatherData = () => {
    setWeatherData(null);
    setTemperatureCelsius(null);
    setTempIcon("");
    setWeatherIcon("");
    setErrorMessage("");
  };

  // Return state variables for use in components
  return {
    weatherData,
    temperatureCelsius,
    tempIcon,
    weatherIcon,
    errorMessage,
    resetWeatherData,
  };
};

export default useWeatherData;
