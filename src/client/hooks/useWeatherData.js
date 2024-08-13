import { useState, useEffect } from "react";

// Import weather icons for different weather conditions
import sunIcon from "/media/weather-icons/sun.svg";
import overcastIcon from "/media/weather-icons/overcast.svg";
import rainIcon from "/media/weather-icons/rain.svg";
import partCloudIcon from "/media/weather-icons/partly-cloudy-day.svg";
import partRainIcon from "/media/weather-icons/partly-cloudy-day-rain.svg";
import partSnowIcon from "/media/weather-icons/partly-cloudy-day-snow.svg";

// Import temperature icons for different temperature ranges
import hotIcon from "/media/weather-icons/thermometers/thermometer-hot.svg";
import warmIcon from "/media/weather-icons/thermometers/thermometer-warm.svg";
import mildIcon from "/media/weather-icons/thermometers/thermometer-mild.svg";
import coldIcon from "/media/weather-icons/thermometers/thermometer-cold.svg";
import freezingIcon from "/media/weather-icons/thermometers/thermometer-freezing.svg";

// Function to determine the appropriate weather icon based on weather conditions
const getWeatherIcon = (cloudCover, rainfall, temperatureCelsius) => {
  // Return overcast icon if cloud cover is high and there is little to no rainfall
  if (cloudCover > 70 && rainfall <= 0.1) return overcastIcon;

  // Return partly cloudy icon if cloud cover is moderate and there is little to no rainfall
  if (cloudCover > 20 && rainfall <= 0.1) return partCloudIcon;

  // Return partly cloudy with rain icon if cloud cover is moderate, rainfall is present, and temperature is above freezing
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius >= 0)
    return partRainIcon;

  // Return partly cloudy with snow icon if cloud cover is moderate, rainfall is present, and temperature is below freezing
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius < 0)
    return partSnowIcon;

  // Return rain icon if rainfall is significant
  if (rainfall >= 0.5) return rainIcon;

  // Default to sunny icon if none of the above conditions are met
  return sunIcon;
};

// Function to determine the appropriate temperature icon based on temperature in Celsius
const getTempIcon = (temperatureCelsius) => {
  // Return hot icon if temperature is 30°C or above
  if (temperatureCelsius >= 30) return hotIcon;

  // Return warm icon if temperature is between 20°C and 29°C
  if (temperatureCelsius >= 20) return warmIcon;

  // Return mild icon if temperature is between 10°C and 19°C
  if (temperatureCelsius >= 10) return mildIcon;

  // Return cold icon if temperature is between 0°C and 9°C
  if (temperatureCelsius >= 0) return coldIcon;

  // Return freezing icon if temperature is below 0°C
  return freezingIcon;
};

// Custom hook to fetch and manage weather data
const useWeatherData = (city, date, submitted, baseUrl) => {
  // State variables to store fetched weather data, temperature, error messages, and icons
  const [temperatureCelsius, setTemperatureCelsius] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [tempIcon, setTempIcon] = useState("");

  // useEffect hook to fetch weather data when city, date, or submitted state changes
  useEffect(() => {
    // Only fetch weather data if city, date, and submitted flag are all present
    if (city && date && submitted) {
      const fetchWeatherData = async () => {
        try {
          // Construct the API URL with query parameters for city and date
          const response = await fetch(
            `${baseUrl}/weather?city=${city}&date=${date}`
          );

          // Check if the response from the server is successful
          if (!response.ok) throw new Error("Network response was not ok");

          // Parse the JSON data returned from the API
          const data = await response.json();
          console.log("Weather data:", data);

          // Calculate the average temperature in Celsius from the min and max temperatures (K -> C)
          const temperatureMin = data.temperature.min;
          const temperatureMax = data.temperature.max;
          const averageTemperature = (temperatureMin + temperatureMax) / 2;
          const temperatureCelsius = Math.round(averageTemperature - 273.15); // Convert Kelvin to Celsius
          setTemperatureCelsius(temperatureCelsius);

          // Determine the appropriate temperature icon based on the calculated temperature
          const tempIcon = getTempIcon(temperatureCelsius);

          // Extract relevant weather data for determining weather icons
          const cloudCover = data.cloud_cover.afternoon;
          const rainfall = data.precipitation.total;

          // Determine the appropriate weather icon based on cloud cover, rainfall, and temperature
          const weatherIcon = getWeatherIcon(
            cloudCover,
            rainfall,
            temperatureCelsius
          );

          // Update the state with fetched weather data, icons, and clear any previous errors
          setWeatherData(data);
          setWeatherIcon(weatherIcon);
          setTempIcon(tempIcon);
          setErrorMessage("");
        } catch (error) {
          // Handle any errors that occur during data fetching
          setErrorMessage("Location not found");
        }
      };

      // Call the function to fetch weather data
      fetchWeatherData();
    }
  }, [city, date, submitted, baseUrl]); // Dependency array to refetch data when any of these values change

  // Function to reset the weather-related state variables
  const resetWeatherData = () => {
    setWeatherData(null);
    setTemperatureCelsius(null);
    setTempIcon("");
    setWeatherIcon("");
    setErrorMessage("");
  };

  // Return the state variables and reset function for use in components
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
